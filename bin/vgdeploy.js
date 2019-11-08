'use strict';

const VueGaeDeployer = require('../lib/deploy');

const { name, version } = require('../package.json');

/**
 * If args error, show the usage of the program.
 * @param {boolean} detailed - Detailed help?
 */
const showUsage = detailed => {
    const description = `${name} ${version}\nA simple tool for deploying a Google App Engine project with a Vue CLI project.`;
    const usage = 'Usage:\n  vgdeploy <vuePath> <gaePath> <gaeStatic> <gaeId> [vueOptions] [gaeOptions]';
    const detail = 'Help:\n  vuePath: The path of the Vue project.\n  gaePath: The path of the Google App Engine project.\n  gaeStatic: The static files folder\'s name of the Google App Engine project.\n  gaeId: The ID of the Google App Engine project.\n  vueOptions: (Optional) The options of the Vue 0roject.\n  gaeOptions: (Optional) The options of the Google App Engine project.';
    console.log(detailed ? `${description}\n\n${usage}\n\n${detail}` : usage);
    process.exit();
};

const args = process.argv;
if (args[1] === '--help') showUsage(true);
if (args.length < 5) showUsage(false);
const [
    prog,
    vuePath,
    gaePath,
    gaeStatic,
    gaeId,
    vueOptions,
    gaeOptions
] = args;
const config = {
    vuePath,
    gaePath,
    gaeStatic,
    gaeId,
    vueOptions,
    gaeOptions
};
(new VueGaeDeployer(config)).deploy()
    .then(() => {
        console.log('Finished with no error.');
    })
    .catch(err => {
        throw err;
    });
