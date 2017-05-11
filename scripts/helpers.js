// ----------------------------------------------------------------------------------------------------------
// A P I
// ----------------------------------------------------------------------------------------------------------

'use strict';

// SYSTEM MODULES
// --------------
const fs = require('fs');
const cwd = process.cwd();
// const path = require('path');

// EXTERNAL PACKAGES
// -----------------
const chalk = require('chalk');
const semver = require('semver');
const figures = require('figures');
// const openUrl = require('openurl');
const git = require('simple-git')(cwd);


// ----------------------------------------------------------------------------------------------------------

/**
 * Get the current branch.
 * @return {promise}    A promise to do it.
 */
function getCurrentBranch() {

    return new Promise(function(resolve, reject) {

        git.branchLocal((err, summary) => {
            /* eslint-disable curly */
            if (err) reject(err);
            /* eslint-enable curly */

            resolve(summary.current);
        });
    });
}


/**
 * Verify the status of the repository.
 * @return {object}     Current branch and the status of hte repository.
 */
function checkOverallStatus() {

    return Promise.all([

        new Promise((resolve, reject) => {

            git.status((err, status) => {
                /* eslint-disable curly */
                if (err) reject(err);
                /* eslint-enable curly */

                resolve(status);
            });
        })
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
    let current = new semver(baseVer);
    let identifier = current.prerelease[0] || 'beta';

    return {
        current: current.version,
        nextMajor: semver.inc(current.version, 'major'),
        nextMinor: semver.inc(current.version, 'minor'),
        nextPatch: semver.inc(current.version, 'patch'),
        nextPreMajor: semver.inc(current.version, 'premajor', identifier),
        nextPreMinor: semver.inc(current.version, 'preminor', identifier),
        nextPrePatch: semver.inc(current.version, 'prepatch', identifier),
        nextPreRelease: semver.inc(current.version, 'prerelease', identifier)
    };
}


/**
 * Promise-base `writeFile` function.
 * @param  {string} targetPath  File path.
 * @param  {string} content     File content.
 * @return {promise}            Promise to write the given file.
 */
function writeFileP(targetPath, content) {
    let fileName = targetPath.split('/').pop();

    if (targetPath.endsWith('.json')) {
        content = JSON.stringify(content, null, 4);
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


// var git = function git(cmd, options) {
//     options = options ? options.join(' ') : '';

//     if (cmd === 'tags') {
//         let allTags = exec('git tag -l').toString().trim().split('\n').sort(function(a, b) {
//             if (semver.lt(a, b)) return -1;
//             if (semver.gt(a, b)) return 1;
//             return 0;
//         });

//         return {
//             latest: allTags[allTags.length - 1],
//             all: allTags
//         };

//     } else if (cmd === 'dateOf') {
//         let date = null;

//         try {
//             date = exec(`git log -1 --format=%cI ${options}`).toString();

//         } catch (error) {
//             date = new Date().toISOString();
//         }

//         return date.substring(0, date.indexOf('T'));

//     } else if (cmd === 'firstCommit') {
//         return exec('git rev-list HEAD | tail -n 1').toString().trim();

//     } else {
//         return exec(`git ${cmd} ${options}`).toString();
//     }
// };


// var getTags = function getTags(newTag) {
//     let tags = git('tags').all;

//     if (newTag) tags.push(newTag);

//     let tagsHolder = new Map(),
//         currentMajor = 1,
//         nextMajor = 2,
//         groups = [];

//     for (var i = 0; i < tags.length; i++) {
//         groups.push({
//             tag: tags[i],
//             date: git('dateOf', [tags[i]])
//         });

//         if (semver.valid(tags[i + 1])) {

//             if (semver.major(tags[i + 1]) === nextMajor) {
//                 tagsHolder.set('v' + currentMajor, groups);

//                 currentMajor++;
//                 nextMajor++;
//                 groups = [];
//             }

//         } else {
//             tagsHolder.set('v' + currentMajor, groups);
//         }
//     }

//     return tagsHolder;
// };


// var writeFile = function writeFile(file, content) {

//         try {
//             fs.writeFileSync(path.join(cwd, file), content);
//             return {
//                 result: true,
//                 message: chalk.green(`${figures.arrowRight} ${file.replace(`${cwd}/`, '')}`)
//         };

//     } catch (error) {
//         return {
//             result: false,
//             message: chalk.red(`${figures.cross} ${error}`)
//         };
//     }
// };


// var writeFilePromise = function writeFilePromise(file, content) {

//     return new Promise(function(resolve, reject) {

//         fs.writeFile(path.join(cwd, file), content, function(error) {

//             if (error) {
//                 reject(chalk.red(`${figures.tick} ${error}`));

//             } else {
//                 resolve(chalk.green(`${figures.cross} ${file.replace(`${cwd}/`, '')}`));
//             }
//         });
//     });
// };


// var releaseGit = function releaseGit(newVersion) {

//     console.log(
//         chalk.cyan(
//             `\n${figures.pointerSmall} Pushing new tag to ${chalk.bold('origin')}...`
//         )
//     );

//     git('add', [
//         'responsive-starter-superwide/css/',
//         'responsive-starter-superwide/js/',
//         'single-column/css/',
//         'single-column/js/',
//         'changelog/',
//         'README.md',
//         'package.json'
//     ]);

//     // git commit -m "Bump version to ${INPUT_STRING}."
//     git('commit', [
//         '-m',
//         `"Bump version to ${newVersion}"`
//     ]);

//     // git push origin master
//     git('push', ['origin', 'master']);

//     // git tag -a -m "Tag version ${INPUT_STRING}." "v$INPUT_STRING"
//     git('tag', [
//         '-a -m',
//         `"Tag version ${newVersion}"`,
//         `"${newVersion}"`
//     ]);

//     // git push origin --tags
//     git('push', ['origin', '--tags']);

//     console.log(
//         chalk.green(
//             `\n${figures.tick} Release ${newVersion} was generated!`
//         )
//     );
//     console.log(
//         chalk.green(
//             `\n  Please go to: ${chalk.underline(`https://github.com/justia/conversion-starters/releases/tag/${newVersion}`)}` +
//             '\n  to describe the new changes/features added in this release.\n'
//         )
//     );

//     openUrl.open(`https://github.com/justia/conversion-starters/releases/tag/${newVersion}`);
// };


/**
 * Function to manage errors.
 * @param  {object} reason  Reasons.
 * @return {object}         Error message.
 */
function catchError(reason) {
    console.error(
        chalk.red(`\n${ figures.cross } ${ reason }`)
    );

    process.exit(1);
}


module.exports = {
    getCurrentBranch,
    checkOverallStatus,
    versionInfo,
    catchError,
    writeFileP
};
