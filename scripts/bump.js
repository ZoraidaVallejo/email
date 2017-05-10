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

var version = $.versionInfo(PKG.version);

var targetBranch = 'diego-public';
var currentBranch = $.checkOverallStatus()

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

        console.log(summary);
        console.log('');

        console.log(summary.files.length);
        console.log(summary.not_added.length);
        console.log(summary.conflicted.length);
        console.log(summary.created.length);
        console.log(summary.deleted.length);
        console.log(summary.modified.length);
        console.log(summary.renamed.length);

        return summary.current;
    })

    // Catch for any errors.
    .catch((reason) => {
        console.error(
            chalk.red(`\n${ figures.cross } ${ reason }`)
        );

        process.exit(1);
    });




// Promise.all([overallStatus])
//     .then((status) => {
//         console.log(version.current);
//         console.log(status);
//     })

//     // Catch for any errors.
//     .catch((reason) => {
//         console.error(
//             chalk.red(`\n${ figures.cross } ${ reason }`)
//         );

//         process.exit(1);
//     });

// if ($.git('status', ['--porcelain']) !== '') {
//     console.error(
//         chalk.red(
//             `\n${figures.cross} ${chalk.bold('Working dirty!')}` +
//             '\n  Please commit before trying again!'
//         )
//     );

//     process.exit(1);
// }

// console.log(
//     chalk.cyan(
//         `\n${figures.info} Current version in package.json is ${chalk.bold(Version.current)}`
//     )
// );

// inquirer.prompt([{
//     type: 'list',
//     name: 'newVersion',
//     message: 'How would you like to bump it?',
//     choices: [
//         { value: 'nextMajor', name: `major (${Version.nextMajor})` },
//         { value: 'nextMinor', name: `minor (${Version.nextMinor})` },
//         { value: 'nextPatch', name: `patch (${Version.nextPatch})` },
//         { value: 'nextPreMajor', name: `pre-release major (${Version.nextPreMajor})` },
//         { value: 'nextPreMinor', name: `pre-release minor (${Version.nextPreMinor})` },
//         { value: 'nextPrePatch', name: `pre-relase patch (${Version.nextPrePatch})` },
//         { value: 'nextPreRelease', name: `pre-release (${Version.nextPreRelease})` }
//     ]
// }]).then(function(answers) {
//     Version = Object.assign(Version, { newVersion: Version[answers.newVersion] });

//     BUMPFILES(Version.newVersion).then(function(prefixedVersion) {

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
