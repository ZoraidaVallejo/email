
// SYSTEM
// ------
const cwd = process.cwd();
const path = require('path');
// const util = require('util');

// EXTERNAL PACKAGES
// -----------------
const chalk = require('chalk');
const figures = require('figures');
const git = require('git-promise');
const gitUtil = require('git-promise/util');

// CUSTOM PACKAGES
// ---------------
const $ = require('./helpers');

// FILES
// -----
const PKG = require(path.join(cwd, 'package.json'));


// git('rev-list HEAD | tail -n 1').then((result) => {
//     console.log(result);
// }).catch($.catchError);


function currentBranch() {

    return git('status --porcelain -b', function(stdout) {
        var status = gitUtil.extractStatus(stdout);
        return status.branch.split('...')[0];
    });
}


function overallStatus() {

    return git('status --porcelain -b', (stdout) => {
        let status = gitUtil.extractStatus(stdout);
        let clean = true;

        /* eslint-disable no-labels */
        loop1:
        for (let layer of [status.index, status.workingTree]) {

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



var versionList = $.versionInfo(PKG.version),
    targetBranch = 'master';


overallStatus().then((status) => {
    // console.log(util.inspect(status, false, null));

    if (status.currentBranch !== targetBranch) {
        console.error(
            chalk.red([
                `\n${ figures.cross } ${ chalk.bold('Working on the wrong branch!') }`,
                `  All tags must be created on ${ chalk.bold(targetBranch) } branch. Please push your work and`,
                `  create a Pull Request to ${ chalk.bold(targetBranch) }. Then you can continue this process.`
            ].join('\n'))
        );

        // process.exit(1);
    }

    if (!status.clean) {
        console.error(
            chalk.red([
                `\n${ figures.cross } ${ chalk.bold('Working dirty!') }`,
                '  Please commit before trying again!'
            ].join('\n'))
        );

        // process.exit(1);
    }

    console.log(
        chalk.cyan(
            `\n${ figures.info } Current version in package.json is ${ chalk.bold(versionList.current) }`
        )
    );

}).catch($.catchError);






