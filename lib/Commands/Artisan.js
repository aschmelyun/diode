import { NodePHP } from '@php-wasm/node';
import { readFileSync, chmodSync } from 'fs';
import Display from '../Actions/Display.js';

export default class Artisan {
    static async run(options, exitOnFinish = true) {

        Display.info('running artisan ' + options.raw.join(' '));
        
        const phpVersion = options['--php'] || options['-P'] || '8.2';

        const artisanPhp = await NodePHP.load(phpVersion, {
            // todo: display formatted output when including verbose option
            emscriptenOptions: {
                print: (text) => {
                    process.stdout.write(text + "\n");
                },
                printErr: (text) => {
                    process.stderr.write(text + "\n");
                },
                onMessage: (text) => {
                    // Do nothing
                    // process.stdout.write(text);
                }
            },
            requestHandler: {
                documentRoot: '/srv',
                absoluteUrl: 'http://localhost:3000',
            }
        });

        artisanPhp.mount(process.cwd(), '/srv/src');

        artisanPhp.chdir('/srv/src');

        chmodSync(process.cwd() + '/bootstrap/cache', 0o777);
        chmodSync(process.cwd() + '/storage', 0o777);
        
        // This is a fun workaround for the cli runtime
        // Apparently the default umask is 0777 which gives the cache files no permissions
        let artisanFile = readFileSync(process.cwd() + '/artisan').toString().split("\n");
        artisanFile.splice(2, 0, 'umask(18);');
        artisanFile = artisanFile.join("\n");

        artisanPhp.writeFile('/srv/src/artisan', artisanFile);

        const phpIniEntries = [
            "display_startup_errors=On",
            "log_errors=1",
            "always_populate_raw_post_data=-1",
            "disable_functions=proc_open,popen,curl_exec,curl_multi_exec",
            "allow_url_fopen=On",
            "session.save_path=/home/web_user",
            "implicit_flush=1",
            "output_buffering=4096",
        ];

        artisanPhp.writeFile('/srv/php.ini', phpIniEntries.join("\n"));

        try {
            const code = await artisanPhp.cli(['php', '-c', '/srv/php.ini', '/srv/src/artisan', ...options.raw]);

            artisanFile = artisanFile.split("\n");
            artisanFile.splice(2, 1);
            artisanFile = artisanFile.join("\n");

            artisanPhp.writeFile('/srv/src/artisan', artisanFile);

            if (exitOnFinish) {
                process.exit(code);
            }
        } catch (resultOrError) {
            const success = resultOrError.name === 'ExitStatus' && resultOrError.status === 0;
            if (!success) {
                throw resultOrError;
            }
        }
    }
}