// ----------------------------------------------------------------------------------------------------------
// B U M P   V E R S I O N   I N   A L L   F I L E S
// ----------------------------------------------------------------------------------------------------------

'use strict';

// SYSTEM
// ------
const path = require('path');
const cwd = process.cwd();

// EXTERNAL PACKAGES
// -----------------
const chalk = require('chalk');
const figures = require('figures');
// const inquirer = require('inquirer');
// const git = require('simple-git')(cwd);

// CUSTOM PACKAGES
// ---------------
const $ = require('./helpers');
// const CHANGELOG = require('./changelog');
// const BUMPFILES = require('./bumpFiles');

// FILES
// -----
const PKG = require(path.join(cwd, 'package.json'));


// ----------------------------------------------------------------------------------------------------------

var versionList = $.versionInfo(PKG.version);

var targetBranch = 'diego-public';
var overallStatus = $.checkOverallStatus()

    .then((status) => {
        let summary = status[0];

        if (summary.current !== targetBranch) {
            console.error(
                chalk.red([
                    `\n${ figures.cross } ${ chalk.bold('Working on the wrong branch!') }`,
                    `  All tags must be created on ${ chalk.bold(targetBranch) } branch. Please push your work and`,
                    `  create a Pull Request to ${ chalk.bold(targetBranch) }. Then you can continue this process.`
                ].join('\n'))
            );

            process.exit(1);
        }

        if (summary.files.length > 0) {
            console.error(
                chalk.red([
                    `\n${ figures.cross } ${ chalk.bold('Working dirty!') }`,
                    '  Please commit before trying again!'
                ].join('\n'))
            );

            process.exit(1);
        }

        return summary.current;
    })

    // Catch for any errors.
    .catch((reason) => {
        console.error(
            chalk.red(`\n${ figures.cross } ${ reason }`)
        );

        process.exit(1);
    });


Promise.all([overallStatus])
    .then((currentBranch) => {
        console.log(currentBranch);

        console.log(
            chalk.cyan(
                `\n${ figures.info } Current version in package.json is ${ chalk.bold(versionList.current) }`
            )
        );
    })

    // Catch for any errors.
    .catch((reason) => {
        console.error(
            chalk.red(`\n${ figures.cross } ${ reason }`)
        );

        process.exit(1);
    });

// inquirer.prompt([{
//     type: 'list',
//     name: 'newVersion',
//     message: 'How would you like to bump it?',
//     choices: [
//         { value: 'nextMajor', name: `major (${versionList.nextMajor})` },
//         { value: 'nextMinor', name: `minor (${versionList.nextMinor})` },
//         { value: 'nextPatch', name: `patch (${versionList.nextPatch})` },
//         { value: 'nextPreMajor', name: `pre-release major (${versionList.nextPreMajor})` },
//         { value: 'nextPreMinor', name: `pre-release minor (${versionList.nextPreMinor})` },
//         { value: 'nextPrePatch', name: `pre-relase patch (${versionList.nextPrePatch})` },
//         { value: 'nextPreRelease', name: `pre-release (${versionList.nextPreRelease})` }
//     ]
// }]).then(function(answers) {
//     versionList = Object.assign(versionList, { newVersion: versionList[answers.newVersion] });

//     BUMPFILES(versionList.newVersion).then(function(prefixedVersion) {

//         CHANGELOG(prefixedVersion).then(function(filesCreated) {
//             console.log(
//                 chalk.green(
//                     `\n${figures.tick} Changelog:\n`
//                 )
//             );
//             console.log(filesCreated);

//             $.releaseGit(prefixedVersion);

//         }).catch(function(error) {
//             console.error(`\n${error}`);
//         });

//     }).catch(function(error) {
//         console.error(`\n${error}`);
//     });
// });
