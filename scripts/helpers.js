// ---------------------------------------------------------------------------------------------------------------------
// A P I
// ---------------------------------------------------------------------------------------------------------------------
/* eslint-disable no-console */

// SYSTEM MODULES
// --------------
const fs = require('fs');
const exec = require('child_process').execSync;

// EXTERNAL PACKAGES
// -----------------
const chalk = require('chalk');
const Semver = require('semver');
const figures = require('figures');
const git = require('git-promise');
const gitUtil = require('git-promise/util');

// ---------------------------------------------------------------------------------------------------------------------

/**
 * It adds an icon and tabulates the log massage.
 * @param  {string} fig     Icon.
 * @param  {string} st      First line of the log message.
 * @param  {array}  lns     Rest of the message.
 * @return {array}          Parsed message.
 */
function logMessage(fig, st, lns) {
  return lns.reduce((a, b) => a.concat(`  ${b}`), [`\n${fig} ${st}`]);
}

/**
 * Console log custom wrapper.
 * @param  {string} first   First line.
 * @param  {args}   lines   Rest of the lines.
 * @return {log}            Log message.
 */
function log(first, ...lines) {
  console.log(logMessage(figures.bullet, first, lines).join('\n'));
}

log.error = function logError(first, ...lines) {
  console.error(`${chalk.red(logMessage(figures.cross, first, lines).join('\n'))}\n`);
  throw new Error();
};

log.info = function logInfo(first, ...lines) {
  console.log(chalk.cyan(logMessage(figures.info, first, lines).join('\n')));
};

log.success = function logSuccess(first, ...lines) {
  console.log(chalk.green(logMessage(figures.tick, first, lines).join('\n')));
};

/**
 * Get the current branch.
 * @return {promise}    A promise to do it.
 */
function currentBranch() {
  return git('status --porcelain -b', stdout => {
    var status = gitUtil.extractStatus(stdout);
    return status.branch.split('...')[0];
  });
}

/**
 * Verify the status of the repository.
 * @return {object}     Current branch and the status of hte repository.
 */
function overallStatus() {
  return git('status --porcelain -b', stdout => {
    var status = gitUtil.extractStatus(stdout);
    var overallGitStatus = Object.values(status.index).concat(Object.values(status.workingTree));

    // Flattened
    overallGitStatus = overallGitStatus.reduce((a, b) => a.concat(b), []);

    return {
      status,
      currentBranch: status.branch.split('...')[0],
      clean: overallGitStatus.length === 0
    };
  });
}

/**
 * Date of a git value
 * @param  {string} val     Value.
 * @return {string}         Date.
 */
function gitDateOf(val) {
  let date = null;

  try {
    date = exec(`git log -1 --format=%cI ${val}`).toString();
  } catch (err) {
    return new Error(err);
  }

  return date.substring(0, date.indexOf('T'));
}

/**
 * Information of existing tags.
 * @param  {string} newTag  Tag.
 * @return {array}          Full info of tags and the first commit.
 */
function tagsInfo(newTag) {
  var date = new Date().toISOString();

  return Promise.all([
    git('git tag -l', stdout => {
      var allTags = stdout
        .toString()
        .trim()
        .split('\n')
        .sort((a, b) => {
          if (Semver.lt(a, b)) return -1;
          if (Semver.gt(a, b)) return 1;
          return 0;
        });

      return allTags;
    })
      .then(infoOfTags => {
        var tagsHolder = {};
        var currentMajor = 1;
        var nextMajor = 2;
        var groups = [];

        infoOfTags.push(newTag);

        infoOfTags.forEach((tag, idx) => {
          groups.push({
            tag,
            date: tag === newTag ? date.substring(0, date.indexOf('T')) : gitDateOf(tag)
          });

          if (Semver.valid(infoOfTags[idx + 1])) {
            if (Semver.major(infoOfTags[idx + 1]) === nextMajor) {
              tagsHolder[`v${currentMajor}`] = groups;

              currentMajor += 1;
              nextMajor += 1;
              groups = [];
            }
          } else {
            tagsHolder[`v${currentMajor}`] = groups;
          }
        });

        return tagsHolder;
      })
      .catch(log.error),

    git('rev-list HEAD | tail -n 1')
  ]);
}

/**
 * List the possible new versions.
 * Borrowed form version-bump-prompt
 * https://github.com/BigstickCarpet/version-bump-prompt/blob/master/lib/index.js#L50
 * @param  {string} baseVer     Initial version.
 * @return {object}             Available versions.
 */
function versionInfo(baseVer = '0.1.0') {
  var current = new Semver(baseVer);
  var identifier = current.prerelease[0] || 'beta';
  var prompt = [];
  var types = {
    major: 'major',
    minor: 'minor',
    patch: 'patch',
    premajor: 'pre-release major',
    preminor: 'pre-release minor',
    prepatch: 'pre-relase patch',
    prerelease: 'pre-release'
  };

  Object.keys(types).forEach(releaseType => {
    const newVer = Semver.inc(current.version, releaseType, releaseType.startsWith('pre') ? identifier : '');

    prompt.push({
      value: newVer,
      name: `${types[releaseType]} (${newVer})`
    });
  });

  return {
    current: current.version,
    prompt
  };
}

/**
 * Promise-base `writeFile` function.
 * @param  {string} targetPath  File path.
 * @param  {string} content     File content.
 * @param  {number} tabs        Number of tabs.
 * @return {promise}            Promise to write the given file.
 */
function writeFileP(targetPath, content, tabs = 4) {
  var fileName = targetPath.split('/').pop();
  var contentHolder = content;

  if (targetPath.endsWith('.json')) {
    contentHolder = JSON.stringify(contentHolder, null, tabs);
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(targetPath, contentHolder, err => {
      if (err) reject(err);

      resolve({
        fullPath: targetPath,
        fileName
      });
    });
  });
}

/**
 * Capitalize each word.
 * Borrowed from https://github.com/grncdr/js-capitalize
 * @param  {string} string  String.
 * @return {string}         Capitalize string.
 */
function capitalize(string) {
  return string.replace(/(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g, m => m.toUpperCase());
}

/**
 * Create Changelog files.
 * @param  {object} tagsList    Tags info.
 * @param  {string} prevTag     Previous tag to compare with.
 * @param  {string} repoURL     URL of the repository.
 * @param  {string} repoName    Name of the repository.
 * @return {promise}            A promise to do it.
 */
function createChangelog(tagsList, prevTag, repoURL, repoName) {
  var writeLogFiles = [];
  var logIndex;
  var logDetailed;
  var logContent;
  var link;
  var prevTagHolder = prevTag;

  Object.keys(tagsList).forEach(majorVersion => {
    logIndex = [];
    logDetailed = [];
    logContent = [
      `\n# ${repoName} ${majorVersion} ChangeLog\n`,
      `All changes commited to this repository will be documented in this file. It adheres to [Semantic Versioning](http://semver.org/).\n`,
      '<details>',
      `<summary>List of tags released on the ${majorVersion} range</summary>\n`
    ];

    tagsList[majorVersion].forEach(info => {
      link = `${info.tag}-${info.date}`;
      logIndex.push(`- [${info.tag}](#${link.replace(/\./g, '')})`);

      logDetailed.push(
        `\n## [${info.tag}](${repoURL}/tree/${info.tag}), ${info.date}\n` +
          `- [Release notes](${repoURL}/releases/tag/${info.tag})\n` +
          `- [Full changelog](${repoURL}/compare/${prevTagHolder}...${info.tag})\n`
      );

      prevTagHolder = info.tag;
    });

    logContent.push(logIndex.reverse().join('\n'), '\n</details>\n\n', logDetailed.reverse().join('\n'));

    writeLogFiles.push(writeFileP(`changelog/CHANGELOG-${majorVersion.toUpperCase()}.md`, logContent.join('\n')));
  });

  return Promise.all(writeLogFiles);
}

/**
 * Convert to an array the status message of the git command.
 * @param  {string} stdout  Message.
 * @return {array}          Array.
 */
function parseGitOutput(stdout) {
  return stdout
    .trim()
    .split('\n')
    .map(line => line.trim());
}

module.exports = {
  currentBranch,
  overallStatus,
  tagsInfo,
  versionInfo,
  writeFileP,
  log,
  capitalize,
  createChangelog,
  parseGitOutput
};
