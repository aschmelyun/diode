import { copyFileSync } from 'fs';
import Display from '../Actions/Display.js';
import Composer from './Composer.js';
import replaceInFile from 'replace-in-file';
import Artisan from './Artisan.js';

export default class Create {
    static async run(options) {

        Display.info('creating a new laravel project in the current directory');

        await Composer.run({ raw: ['create-project', 'laravel/laravel', '.'] }, false);

        copyFileSync(process.cwd() + '/.env.example', process.cwd() + '/.env');
    
        await replaceInFile({
            files: process.cwd() + '/.env',
            from: [
                'DB_CONNECTION=mysql',
                'DB_HOST=127.0.0.1',
                'DB_PORT=3306',
                'DB_DATABASE=laravel',
                'DB_USERNAME=root',
                'DB_PASSWORD='
            ],
            to: [
                'DB_CONNECTION=sqlite',
                '# DB_HOST=127.0.0.1',
                '# DB_PORT=3306',
                '# DB_DATABASE=laravel',
                '# DB_USERNAME=root',
                '# DB_PASSWORD='
            ]
        });

        await Artisan.run({ raw: ['package:discover', '--ansi'] }, false);

        await Artisan.run({ raw: ['vendor:publish', '--tag=laravel-assets', '--ansi', '--force'] }, false);

        await Artisan.run({ raw: ['key:generate', '--ansi'] }, false);

        process.exit(0);
    }
}