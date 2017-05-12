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
// const changelog = require('./changelog');

// FILES
// -----
const PKG = require(path.join(cwd, 'package.json'));


// ----------------------------------------------------------------------------------------------------------

var versionList = $.versionInfo(PKG.version),
    targetBranch = 'diego-public';


$.overallStatus().then((status) => {

    if (status.currentBranch !== targetBranch) {

        $.log.error(
            `${ chalk.bold('Working on the wrong branch!') }`,
            `All tags must be created on ${ chalk.bold(targetBranch) } branch. Please push your work and`,
            `create a Pull Request to ${ chalk.bold(targetBranch) }. Then you can continue this process.`
        );
    }

    // if (!status.clean) {

    //     $.log.error(
    //         `${ chalk.bold('Working dirty!') }`,
    //         'Please commit before trying again!'
    //     );
    // }

    $.log.info(
        `Current version in package.json is ${ chalk.bold(versionList.current) }\n`
    );

    return inquirer.prompt([{
        type: 'list',
        name: 'newVersion',
        message: 'How would you like to bump it?',
        choices: versionList.prompt
    }]);

}).then((answers) => {
    PKG.version = answers.newVersion;

    // Update Package file
    return $.writeFileP(path.join(cwd, 'package.json'), PKG, 2);

// Continue if the update to the Package files was successful
}).then((reweritePKG) => {

    $.log.success(
        `Version bumped in the following file:`,
        `${ figures.arrowRight } ${ reweritePKG.fileName }`
    );

    return $.tagsInfo('v' + PKG.version);

// Continue if the update to the Package files was successful
}).then(([tags, firstCommit]) => {
    // let prevTag = firstCommit;

    console.log(tags);
    console.log(firstCommit);

}).catch($.log.error);
