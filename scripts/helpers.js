// ----------------------------------------------------------------------------------------------------------
// A P I
// ----------------------------------------------------------------------------------------------------------

'use strict';

// SYSTEM MODULES
// --------------
const fs = require('fs');
// const cwd = process.cwd();
// const path = require('path');

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
    catchError,
    log,
    capitalize
};
