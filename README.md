# Diode

[![MIT Licensed](https://img.shields.io/github/license/aschmelyun/diode)](LICENSE.md)
[![Node 16.0.0 or higher](https://img.shields.io/node/v/diode-cli)](https://npmjs.com/package/diode-cli)
[![Total Downloads](https://img.shields.io/npm/dt/diode-cli)](https://npmjs.com/package/diode-cli)

> A zero-configuration, wasm-powered local development environment for Laravel

Diode is a Node CLI app containing a PHP server specifically built to run a local development environment for the Laravel framework. It's heavily inspired by, and built on the work of, the [WordPress Playground](https://github.com/WordPress/wordpress-playground) team.

**Note:** This is currently in active development and updates can contain breaking changes. If you find a bug, feel free to [open an issue](https://github.com/aschmelyun/diode/issues/new)!

## Installation

Installation is through npm and requires Node version >= 16.0.0.

```bash
npm install -g diode-cli
```

## Basic Usage

To create a new Laravel application in the current (empty) directory, run the create command.

```bash
diode create
```

This will take a minute or two to complete, but then a brand new Laravel application source code should be available in the current directory.

To run the application locally, start the server with the serve command.

```bash
diode serve
```

This will mount the current directory as a virtual filesystem and start listening at `localhost:1738`. You can override the port that it's bound to by including the `port` option.

```bash
diode serve --port=8080
```

You can run most [Composer](https://getcomposer.org) commands with Diode, passing in the package and options you would natively.

```bash
diode composer require laravel/breeze --dev
```

Artisan commands are also available via the command of the same name.

```bash
diode artisan make:model Comment --migration
```

## Why Build This?

Getting started developing PHP applications can be notoriously tricky compared with other languages like JavaScript.

Installing PHP locally has a history of being difficult depending on the OS you're using, and Docker exists but might be a bit complicated for new developers.

I built Diode as a kind of quick-start tool to spin up a local environment, letting you hit the ground running to build an application with Laravel.

If you find yourself wanting more out of a local environment, I suggest trying out something like Docker as the next step! I have a series of [YouTube videos](https://www.youtube.com/watch?v=5N6gTVCG_rw) and a [full course](https://laraveldocker.com) available if you'd like to learn more about using Docker with Laravel.

## Contact

Have an issue? [Submit it here!](https://github.com/aschmelyun/diode/issues/new) Want to get in touch or recommend a feature? Feel free to reach out to me on [Twitter](https://twitter.com/aschmelyun) for any other questions or comments.

## License

This software is licensed under The MIT License (MIT). See [LICENSE.md](LICENSE.md) for more details.
