import { NodePHP } from '@php-wasm/node';
import { readFileSync } from 'fs';
import Display from '../Actions/Display.js';
import Cache from '../Actions/Cache.js';
import { homedir } from 'os';

export default class Composer {
    static async run(options, exitOnFinish = true) {

        await Cache.sync({
            url: 'https://getcomposer.org/composer.phar',
            path: homedir() + '/.diode/composer.phar',
            title: 'composer'
        });

        Display.progress('running composer ' + options.raw.join(' '));
        
        const phpVersion = options['--php'] || options['-P'] || '8.2';

        const composerPhp = await NodePHP.load(phpVersion, {
            // todo: display formatted output when including verbose option
            emscriptenOptions: {
                print: (text) => {
                    // Do nothing
                    // process.stdout.write(text);
                },
                printErr: (text) => {
                    if (options['--verbose'] || options['-v']) {
                        process.stderr.write('  ' + text + "\n");
                    }
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

        composerPhp.mount(process.cwd(), '/srv/src');

        composerPhp.chdir('/srv/src');

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

        composerPhp.writeFile('/srv/php.ini', phpIniEntries.join("\n"));

        composerPhp.writeFile('/srv/composer.phar', readFileSync(homedir() + '/.diode/composer.phar'));

        try {
            const code = await composerPhp.cli(['php', '-c', '/srv/php.ini', '/srv/composer.phar', '--ignore-platform-reqs', '--no-progress', '--no-scripts', ...options.raw]);
            Display.progressComplete();

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