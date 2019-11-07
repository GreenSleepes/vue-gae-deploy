'use strict';

const { spawn } = require('child_process');
const { rename } = require('fs');

class VueGaeDeployer {

    /**
     * Build a new VueGaeDeployer.
     * @param {object} config - The configurations for the deployer.
     * @param {string} config.vuePath - The path of the Vue project.
     * @param {string} config.gaePath - The path of the Google App Engine project.
     * @param {string} config.gaeStatic - The static files folder's name of the Google App Engine project.
     * @param {string} config.gaeId - The ID of the Google App Engine project.
     * @param {string} [config.vueOptions] - (Optional) The options of the Vue project.
     * @param {string} [config.gaeOptions] - (Optional) The options of the Google App Engine project.
     */
    constructor(config) {

        // Check the input type.
        Object.keys(config).forEach(key => {
            if (typeof config[key] !== 'string') {
                throw new TypeError('All the configurations must in string type.');
            }
        });

        // Standardise the path: '/the/vue/path' -> '/the/vue/path/'
        if (config.vuePath[config.vuePath.length - 1] !== '/') {
            config.vuePath += '/';
        }

        // Standardise the path: '/the/gae/path' -> '/the/gae/path/'
        if (config.gaePath[config.gaePath.length - 1] !== '/') {
            config.gaePath += '/';
        }

        this.config = config;

    }

    /** Build the Vue project. */
    buildVue() {
        return new Promise((resolve, reject) => {
            const args = ['build'];
            if (this.config.vueOptions) {
                const userArgs = this.config.vueOptions.split(' ');
                args = args.push(userArgs);
            }
            const cli = spawn('vue-cli-service', args, { cwd: this.config.vuePath });
            cli.stdout.pipe(process.stdout);
            cli.stderr.pipe(process.stderr);
            cli.on('close', code => {
                // Throw an error if the Vue CLI cannot exit normally.
                if (code) {
                    reject(`The Vue CLI exited with code ${code}.`);
                } else {
                    // Move the outputs to the Google App Engine project folder.
                    rename(`${this.config.vuePath}dist`, `${this.config.gaePath}${this.config.gaeStatic}`, err => {
                        if (err) reject(err);
                        resolve();
                    });
                }
            });
        });
    }

    /** Deploy the Google App Engine project. */
    deployGae() {
        return new Promise((resolve, reject) => {
            const args = ['app', 'deploy', '--project', this.config.gaeId];
            if (this.config.gaeOptions) {
                const userArgs = this.config.gaeOptions.split(' ');
                args = args.push(userArgs);
            }
            const cli = spawn('gcloud', args, { cwd: this.config.gaePath });
            cli.stdout.pipe(process.stdout);
            cli.stderr.pipe(process.stderr);
            cli.on('close', code => {
                // Throw an error if the Google Cloud SDK cannot exit normally.
                if (code) {
                    reject(`The Google Cloud SDK exited with code ${code}.`);
                } else {
                    resolve();
                }
            });
        });
    }

    /** Deploy the projects. */
    async deploy() {
        try {
            await this.buildVue();
            await this.deployGae();
        } catch (err) {
            throw err;
        }
    }

}

module.exports = VueGaeDeployer;