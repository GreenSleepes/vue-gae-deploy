'use strict';

const VueGaeDeployer = require('../lib/deploy');

/** If args error, show the usage of the program. */
const showUsage = () => {
    const usage = '';
    console.log(usage);
    process.exit();
};

const args = process.argv;
if (args.length < 5) showUsage();
if (args[1] === '--help') showUsage();
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
(new VueGaeDeployer(config)).deploy();
