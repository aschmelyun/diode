export default class ParseInput {
    static run(args) {
        const command = args._[0];
        args._.shift();
        args.raw = process.argv.slice(3);

        // Set a default PHP version of 8.2 if the one specified is invalid
        if (typeof args['--php'] !== 'undefined') {
            if (!['5.6', '7.0', '7.1', '7.2', '7.3', '7.4', '8.0', '8.1', '8.2'].includes(args['--php'])) {
                args['--php'] = '8.2';
            }
        }

        return {
            command,
            ...args,
        };
    }
}