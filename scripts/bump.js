// ----------------------------------------------------------------------------------------------------------
// B U M P   V E R S I O N   I N   A L L   F I L E S
// ----------------------------------------------------------------------------------------------------------

'use strict';

// SYSTEM
// ------
const cwd = process.cwd();
const path = require('path');

// EXTERNAL PACKAGES
// -----------------
const chalk = require('chalk');
const figures = require('figures');
const inquirer = require('inquirer');
// const replace = require('replace-in-file');
// const git = require('simple-git')(cwd);

// CUSTOM PACKAGES
// ---------------
const $ = require('./helpers');
const changelog = require('./changelog');

// FILES
// -----
const PKG = require(path.join(cwd, 'package.json'));


// ----------------------------------------------------------------------------------------------------------

var versionList = $.versionInfo(PKG.version),
    targetBranch = 'diego-public';


var overallStatus = $.checkOverallStatus().then((status) => {
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

        // process.exit(1);
    }

    return summary.current;

// Catch for any errors.
}).catch($.catchError);


Promise.all([overallStatus]).then((currentBranch) => {

    console.log(
        chalk.cyan(
            `\n${ figures.info } Current version in package.json is ${ chalk.bold(versionList.current) }`
        )
    );

    inquirer.prompt([{
        type: 'list',
        name: 'newVersion',
        message: 'How would you like to bump it?',
        choices: [
            { value: 'nextMajor', name: `major (${ versionList.nextMajor })` },
            { value: 'nextMinor', name: `minor (${ versionList.nextMinor })` },
            { value: 'nextPatch', name: `patch (${ versionList.nextPatch })` },
            { value: 'nextPreMajor', name: `pre-release major (${ versionList.nextPreMajor })` },
            { value: 'nextPreMinor', name: `pre-release minor (${ versionList.nextPreMinor })` },
            { value: 'nextPrePatch', name: `pre-relase patch (${ versionList.nextPrePatch })` },
            { value: 'nextPreRelease', name: `pre-release (${ versionList.nextPreRelease })` }
        ]

    }]).then((answers) => {
        versionList.newVersion = versionList[answers.newVersion];
        PKG.version = versionList.newVersion;

        // Update Package file
        return $.writeFileP(path.join(cwd, 'package.json'), PKG, 2);

    // Continue if the update to the Package files was successful
    }).then((reweritePKG) => {

        console.log(
            chalk.green([
                `\n${ figures.tick } Version bumped in the following file:`,
                `${ figures.arrowRight } ${ reweritePKG.fileName }`
            ].join('\n'))
        );

    }).catch($.catchError);

// Catch for any errors.
}).catch($.catchError);
