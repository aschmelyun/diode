import { NodePHP } from '@php-wasm/node';
import Display from '../Actions/Display.js';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

export default class Serve {
    static async run(options) {
        const phpVersion = options['--php'] || options['-P'] || '8.2';
        const port = options['--port'] || options['-p'] || 1738;

        const servePhp = await NodePHP.load(phpVersion, {
            requestHandler: {
                documentRoot: '/srv/public',
                absoluteUrl: 'http://localhost:' + port,
                isStaticFilePath: (path) => path.includes('build/assets')
            },
        });

        servePhp.setPhpIniEntry('allow_url_fopen', 'On');
        servePhp.setPhpIniEntry('disable_functions', 'proc_open,popen,curl_exec,curl_multi_exec');

        servePhp.mount(process.cwd(), '/srv');

        servePhp.onMessage((message) => {
            Display.log(message);
        });

        const app = express();

        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        app.all('*', async (req, res) => {
            if (req.url.includes('build/assets') || req.url.includes('favicon.ico')) {
                let dirname = fileURLToPath(new URL('.', import.meta.url));

                res.sendFile(path.join(process.cwd(), 'public', req.url));

                return;
            }

            Display.request(req.method, req.url);

            servePhp.addServerGlobalEntry('SCRIPT_NAME', '/index.php');
            servePhp.addServerGlobalEntry('SCRIPT_FILENAME', '/srv/public/index.php');

            const response = await servePhp.request({
                method: req.method,
                url: req.url,
                headers: req.headers,
                // body: req.body,
                formData: req.body,
            });

            res.status(response.httpStatusCode);

            for (const [key, value] of Object.entries(response.headers)) {
                res.set(key, value.join(''));
            }

            res.send(response.text);
        });

        app.listen(port, () => {
            console.clear();
            Display.info('server started at http://localhost:' + port);
        });
    }
}