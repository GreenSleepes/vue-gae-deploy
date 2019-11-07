'use strict';

const { exec } = require('child_process');
const fs = require('fs');

class VueGaeDeployer {

    /**
     * Build a new VueGaeDeployer.
     * @param {object} config - The configurations for the deployer.
     * @param {string} config.vuePath - The path of the Vue project.
     * @param {string} config.gaePath - The path of the Google App Engine project.
     * @param {string} config.gaeId - The ID of the Google App Engine project.
     * @param {string} [config.vueArgs] - (Optional) The arguments of the Vue project.
     * @param {string} [config.gaeArgs] - (Optional) The arguments of the Google App Engine project.
     */
    constructor(config) {

        // Check the input type.
        Object.keys(config).forEach(key => {
            if (typeof config[key] !== 'string') {
                throw new TypeError('All the configurations must in string type.');
            }
        });

        this.config = config;

    }

    /**
     * Build the Vue project.
     * @returns {Promise<string>} The path of the output folder.
     */
    buildVue() {
        return new Promise((resolve, reject) => {

        });
    }

    /**
     * Deploy the Google App Engine project.
     * @param {string} vueDist - The path of the vue output folder.
     */
    deployGae(vueDist) {
        return new Promise((resolve, reject) => {

        });
    }

    /** Deploy the projects. */
    async deploy() {
        try {
            const vueDist = await this.buildVue();
            await this.deployGae(vueDist);
        } catch (err) {
            throw err;
        }
    }

}

module.exports = VueGaeDeployer;