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
const replace = require('replace-in-file');
// const git = require('simple-git')(cwd);

// CUSTOM PACKAGES
// ---------------
const $ = require('./helpers');
// const bumpfiles = require('./bumpFiles');
// const CHANGELOG = require('./changelog');

// FILES
// -----
const PKG = require(path.join(cwd, 'package.json'));


// ----------------------------------------------------------------------------------------------------------

var versionList = $.versionInfo(PKG.version);
var targetBranch = 'diego-public';

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
        let repalceOptions = {

            files: [
                'responsive-starter-superwide/css/scss/**/*.scss',
                'responsive-starter-superwide/js/*.js',
                'single-column/css/scss/**/*.scss',
                'single-column/js/*.js',
                'README.md'
            ],

            // Replacement to make (string or regex)
            from: /((?:#|\/\/) Conversion Starter(?:s|) v)(\d.*)/,
            to: `$1${ bumpVersion }`,

            // Specify if empty/invalid file paths are allowed (defaults to false)
            // If set to true these paths will fail silently and no error will be thrown.
            allowEmptyPaths: false,

            // Character encoding for reading/writing files (defaults to utf-8)
            encoding: 'utf8'
        };

        versionList.newVersion = versionList[answers.newVersion];

        // Bump Version in all files
        return replace(repalceOptions);

    // Success
    }).then((changedFiles) => {

        console.log(
            chalk.green(
                `\n${ figures.tick } Version bumped in the following files:\n`
            )
        );

        for (let file of changedFiles) {
            console.log(
                chalk.green(
                    `${ figures.arrowRight } ${ file }`
                )
            );
        }

        PKG.version = versionList.newVersion;

        // Update Package file
        return $.writeFileP(path.join(cwd, 'package.json'), PKG);

    // Success
    }).then((reweritePKG) => {
        console.log(reweritePKG);

        console.log(
            chalk.green(`${ figures.arrowRight } ${ file.replace(`${ cwd }/`, '') }`)
        );

        // BUMPFILES(versionList.newVersion).then(function(prefixedVersion) {

        //     CHANGELOG(prefixedVersion).then(function(filesCreated) {
        //         console.log(
        //             chalk.green(
        //                 `\n${ figures.tick } Changelog:\n`
        //             )
        //         );
        //         console.log(filesCreated);

        //         $.releaseGit(prefixedVersion);

        //     }).catch(function(error) {
        //         console.error(`\n${ error }`);
        //     });

        // }).catch(function(error) {
        //     console.error(`\n${ error }`);
        // });

    }).catch($.catchError);

// Catch for any errors.
}).catch($.catchError);
