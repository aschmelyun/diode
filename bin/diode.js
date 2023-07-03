#!/usr/bin/env node
import Diode from '../lib/Diode.js';
import arg from 'arg';

global.version = '0.1.2';

const options = {
    permissive: true,
    argv: process.argv.slice(2),
};

const args = arg({
    // Display verbose output, not used yet
    '--verbose': Boolean,

    // Change the port to start the server on
    '--port': Number,

    // Change the PHP version used by the wasm interpreter
    '--php': String,

    // Aliases
    '-v': '--verbose',
    '-p': '--port',
    '-P': '--php',
}, options);

Diode.run(args);