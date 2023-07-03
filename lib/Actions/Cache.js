import { existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import ora from 'ora';
import Display from './Display.js';
import { createWriteStream } from 'fs';
import https from 'https';

export default class Cache {

    static async sync(options) {
        const { url, path, title } = options;

        Cache.createCacheDirectory();

        if (existsSync(path)) {
            return;
        }

        Display.info('downloading ' + title + ' to cache locally');

        await Cache.download(url, path);
    }

    static async download(url, path) {
        return new Promise((resolve, reject) => {
            const file = createWriteStream(path);

            https.get(url, (response) => {
                response.pipe(file);

                file.on('finish', () => {
                    resolve();
                });
            }).on('error', (error) => {
                reject(error);
            });
        });
    }

    static createCacheDirectory() {
        const cacheDirectory = homedir() + '/.diode';

        if (!existsSync(cacheDirectory)) {
            mkdirSync(cacheDirectory);
        }
    }
}