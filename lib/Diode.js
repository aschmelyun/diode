import Display from './Actions/Display.js';
import ParseInput from './Actions/ParseInput.js';
import Artisan from './Commands/Artisan.js';
import Composer from './Commands/Composer.js';
import Serve from './Commands/Serve.js';
import Create from './Commands/Create.js';

export default class Diode {
    static run(args) {

        Display.intro();

        const { command, ...options } = ParseInput.run(args);

        switch (command) {
            case 'help':
                Display.help();
                break;
            case 'version':
                Display.version();
                break;
            case 'composer':
                Composer.run(options);
                break;
            case 'artisan':
                Artisan.run(options);
                break;
            case 'serve':
                Serve.run(options);
                break;
            case 'create':
                Create.run(options);
                break;
            default:
                Display.help();
                break;
        }
    }
}