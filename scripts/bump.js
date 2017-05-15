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
const git = require('git-promise');
// const openUrl = require('openurl');

// CUSTOM PACKAGES
// ---------------
const $ = require('./helpers');

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

}).then((reweritePKG) => {
    // Continue if the update to the Package files was successful.

    $.log.success(
        `Version bumped in the following file:`,
        `${ figures.arrowRight } ${ reweritePKG.fileName }`
    );

    return $.tagsInfo(`v${ PKG.version }`);

}).then(function([tagsList, firstCommit]) {
    // Continue if the update to the Package files was successful.

    return $.createChangelog(
        // Object with all the tags info.
        tagsList,

        // First commit.
        firstCommit.trim(),

        // URL of the repository.
        PKG.repository.url.substring(0, PKG.repository.url.indexOf('.git')),

        // Name of the repository.
        $.capitalize(PKG.name.replace(/-/g, ' '))
    );

}).then((result) => {
    // Continue if the changelog files were created successfully.

    let _log = [];

    for (let i = 0; i < result.length; i++) {
        _log.push(
            `${ figures.arrowRight } ${ result[i].fileName }`
        );
    }

    $.log.success(
        `Changelog:`,
        ..._log
    );

    // API.releaseGit(prefixedVersion);
    // Make release

    $.log.info(
        `Pushing new tag to ${ chalk.bold('origin') }...`
    );

    let filesToAdd = [
        'changelog/',
        'package.json'
    ];

    return git(`add ${ filesToAdd.join(' ') }`).then(() => {
        let _commitMessage = `Bump version to ${ PKG.version }`;

        return git(`commit -m "${ _commitMessage }"`, $.parseGitOutput);

    }).then((status) => {
        $.log.success(...status);

        return git(`push origin ${ targetBranch }`, $.parseGitOutput);
    });

    // // git tag -a -m "Tag version ${INPUT_STRING}." "v$INPUT_STRING"
    // git('tag', [
    //     '-a -m',
    //     `"Tag version ${newVersion}"`,
    //     `"${newVersion}"`
    // ]);

    // // git push origin --tags
    // git('push', ['origin', '--tags']);

    // console.log(
    //     chalk.green(
    //         `\n${figures.tick} Release ${newVersion} was generated!`
    //     )
    // );
    // console.log(
    //     chalk.green(
    //         `\n  Please go to: ${chalk.underline(`https://github.com/justia/conversion-starters/releases/tag/${newVersion}`)}` +
    //         '\n  to describe the new changes/features added in this release.\n'
    //     )
    // );


}).then((result) => {
    $.log.success(...result);

    // openUrl.open(`https://github.com/justia/conversion-starters/releases/tag/${newVersion}`);

}).catch($.log.error);
