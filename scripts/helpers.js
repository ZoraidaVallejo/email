// ----------------------------------------------------------------------------------------------------------
// A P I
// ----------------------------------------------------------------------------------------------------------

'use strict';

// SYSTEM MODULES
// --------------
const fs = require('fs');
// const cwd = process.cwd();
// const path = require('path');
const exec = require('child_process').execSync;

// EXTERNAL PACKAGES
// -----------------
const chalk = require('chalk');
const semver = require('semver');
const figures = require('figures');
const git = require('git-promise');
const gitUtil = require('git-promise/util');
// const openUrl = require('openurl');


// ----------------------------------------------------------------------------------------------------------

/**
 * Get the current branch.
 * @return {promise}    A promise to do it.
 */
function currentBranch() {

    return git('status --porcelain -b', function(stdout) {
        var status = gitUtil.extractStatus(stdout);
        return status.branch.split('...')[0];
    });
}


/**
 * Verify the status of the repository.
 * @return {object}     Current branch and the status of hte repository.
 */
function overallStatus() {

    return git('status --porcelain -b', (stdout) => {
        let status = gitUtil.extractStatus(stdout);
        let clean = true;

        /* eslint-disable no-labels */
        loop1:
            for (let layer of[status.index, status.workingTree]) {

                for (let sts in layer) {

                    if (layer[sts].length > 0) {
                        clean = false;
                        break loop1;
                    }
                }
            }
        /* eslint-enable no-labels */

        return {
            status,
            currentBranch: status.branch.split('...')[0],
            clean
        };
    });
}


/**
 * Date of a git value
 * @param  {string} val     Value.
 * @return {string}         Date.
 */
function _gitDateOf(val) {
    let date = null;

    try {
        date = exec(`git log -1 --format=%cI ${ val }`).toString();

    } catch(err) {
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

        git('git tag -l', (stdout) => {
            let allTags = stdout.toString().trim().split('\n').sort(function(a, b) {

                /* eslint-disable curly */
                if (semver.lt(a, b)) return -1;
                if (semver.gt(a, b)) return 1;
                /* eslint-enable curly */
                return 0;
            });

            // latest: allTags[allTags.length - 1],
            return allTags;

        }).then((tagsInfo) => {
            tagsInfo.push(newTag);

            let tagsHolder = {},
                currentMajor = 1,
                nextMajor = 2,
                groups = [];

            for (var i = 0; i < tagsInfo.length; i++) {

                groups.push({
                    tag: tagsInfo[i],
                    date: tagsInfo[i] === newTag ? date.substring(0, date.indexOf('T')) : _gitDateOf(tagsInfo[i])
                });

                if (semver.valid(tagsInfo[i + 1])) {

                    if (semver.major(tagsInfo[i + 1]) === nextMajor) {
                        // tagsHolder.set(`v${ currentMajor }`, groups);
                        tagsHolder[`v${ currentMajor }`] = groups;

                        currentMajor++;
                        nextMajor++;
                        groups = [];
                    }

                } else {
                    // tagsHolder.set(`v${ currentMajor }`, groups);
                    tagsHolder[`v${ currentMajor }`] = groups;
                }
            }

            return tagsHolder;

        }).catch(log.error),

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
    let current = new semver(baseVer),
        identifier = current.prerelease[0] || 'beta',
        prompt = [];

    let types = {
        major: 'major',
        minor: 'minor',
        patch: 'patch',
        premajor: 'pre-release major',
        preminor: 'pre-release minor',
        prepatch: 'pre-relase patch',
        prerelease: 'pre-release'
    };

    for (let type in types) {
        let newVer = semver.inc(
            current.version,
            type,
            type.startsWith('pre') ? identifier : ''
        );

        prompt.push({
            value: newVer,
            name: `${ types[type] } (${ newVer })`
        });
    }

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
    let fileName = targetPath.split('/').pop();

    if (targetPath.endsWith('.json')) {
        content = JSON.stringify(content, null, tabs);
    }

    return new Promise((resolve, reject) => {

        fs.writeFile(targetPath, content, (err) => {
            /* eslint-disable curly */
            if (err) reject(err);
            /* eslint-enable curly */

            resolve({
                fullPath: targetPath,
                fileName
            });
        });
    });
}


/**
 * It adds an icon and tabulates the log massage.
 * @param  {string} fig     Icon.
 * @param  {string} st      First line of the log message.
 * @param  {array}  lns     Rest of the message.
 * @return {array}          Parsed message.
 */
function _logMessage(fig, st, lns) {
    let holder = [`\n${ fig } ${ st }`];

    if (lns.length > 0) {

        for (let i = 0; i < lns.length; i++) {
            holder.push(`  ${ lns[i] }`);
        }
    }

    return holder;
}


/**
 * Console log custom wrapper.
 * @param  {string} first   First line.
 * @param  {args}   lines   Rest of the lines.
 * @return {log}            Log message.
 */
function log(first, ...lines) {
    console.log(
        _logMessage(figures.bullet, first, lines).join('\n')
    );
}

log.error = function(first, ...lines) {
    console.error(
        `${ chalk.red(_logMessage(figures.cross, first, lines).join('\n')) }\n`
    );

    process.exit(1);
};

log.info = function(first, ...lines) {
    console.log(
        chalk.cyan(
            _logMessage(figures.info, first, lines).join('\n')
        )
    );
};

log.success = function(first, ...lines) {
    console.log(
        chalk.green(
            _logMessage(figures.tick, first, lines).join('\n')
        )
    );
};


/**
 * Capitalize each word.
 * Borrowed from https://github.com/grncdr/js-capitalize
 * @param  {string} string  String.
 * @return {string}         Capitalize string.
 */
function capitalize(string) {
    return string.replace(/(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g, function(m) {
        return m.toUpperCase();
    });
}


module.exports = {
    currentBranch,
    overallStatus,
    versionInfo,
    writeFileP,
    log,
    capitalize,
    tagsInfo
};
