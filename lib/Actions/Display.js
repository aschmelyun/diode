import chalk from 'chalk';

export default class Display {

    static intro() {
        console.log('  ' + chalk.gray.bold('+----------------+'));
        console.log('  ' + chalk.gray.bold('| ') + chalk.white.bold('diode') + chalk.red.bold(' ---▶|---') + chalk.gray.bold(' |'));
        Display.line(chalk.gray.bold('+----------------+'));
    }

    static version() {
        Display.line(chalk.red.bold('Version: ') + chalk.white('v' + global.version));
    }

    static error(message) {
        Display.line(chalk.white.bgRed(' ERROR ') + ' ' + chalk.white(message));
    }

    static success(message) {
        Display.line(chalk.white.bgGreen(' ERROR ') + ' ' + chalk.white(message));
    }

    static info(message) {
        Display.line(chalk.white.bgBlue(' INFO ') + ' ' + chalk.white(message));
    }

    static log(message) {
        Display.line(chalk.white.bgGray(' LOG ') + ' ' + chalk.white(message));
    }

    static request(type, url) {

        let intros = {
            'GET': chalk.white.bgGreen(' GET ') + '    ',
            'POST': chalk.white.bgCyan(' POST ') + '   ',
            'PUT': chalk.white.bgYellow(' PUT ') + '    ',
            'PATCH': chalk.white.bgMagenta(' PATCH ') + '  ',
            'DELETE': chalk.white.bgRed(' DELETE ') + ' '
        };

        console.log('  ' + intros[type] + chalk.white(url));
        console.log('           ' + chalk.gray((new Date()).toLocaleTimeString('en-US')));
        console.log('');
    }

    static help() {
        Display.line(chalk.red.bold('Description: ') + chalk.white('A wasm-powered local development environment for Laravel.'));
        Display.line(chalk.red.bold('Version: ') + chalk.white('v' + global.version));
        Display.line(chalk.red.bold('Usage: ') + chalk.white('diode ') + chalk.gray('[options]'));
        console.log('  ' + chalk.red.bold('Options: '))
        console.log('    ' + chalk.white('create') + '     ' + chalk.gray('create a new Laravel project'));
        console.log('    ' + chalk.white('serve') + '      ' + chalk.gray('run the local development server'));
        console.log('    ' + chalk.white('artisan') + '    ' + chalk.gray('run artisan commands'));
        console.log('    ' + chalk.white('composer') + '   ' + chalk.gray('run composer commands'));
        console.log('    ' + chalk.white('version') + '    ' + chalk.gray('displays the current version of diode'));
        console.log('    ' + chalk.white('help') + '       ' + chalk.gray('what you\'re seeing right now :)'));
        console.log('')
    }

    static progress(message) {
        process.stdout.write('  ' + chalk.white.bgBlue(' INFO ') + ' ' + chalk.white(message) + ' ');
        
        this.progressTimeout = setInterval(() => {
            process.stdout.write(chalk.gray('.'));
        }, 1000);
    }

    static progressComplete() {
        clearTimeout(this.progressTimeout);
        process.stdout.write("\n");
        console.log('');
    }

    static line(message) {
        console.log('  ' + message);
        console.log('');
    }
}