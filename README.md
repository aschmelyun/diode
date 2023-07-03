# Diode

[![MIT Licensed](https://img.shields.io/github/license/aschmelyun/diode)](LICENSE.md)
[![Node 16.0.0 or higher](https://img.shields.io/node/v/diode-cli)](https://npmjs.com/package/diode-cli)
[![Total Downloads](https://img.shields.io/npm/dt/diode-cli)](https://npmjs.com/package/diode-cli)

> A zero-configuration, wasm-powered local development environment for Laravel

Diode is a wasm-powered PHP server specifically developed to run a local development environment for the Laravel framework. It's heavily inspired by, and built on the work of, the [WordPress Playground](https://github.com/WordPress/wordpress-playground) team.

**Note:** This is currently in active development and updates can contain breaking changes. If you find a bug, feel free to [open an issue](https://github.com/aschmelyun/diode/issues/new)!

## Installation

Installation is through npm and requires Node version >= 16.0.0.

```bash
npm install -g diode-cli
```

## Basic Usage

To start the server, run a single command.

```bash
diode serve
```

This will mount the **current directory** as a virtual filesystem and start the server at `localhost:1738`. You can override the port that it's bound to by including the option.

```bash
diode serve --port=8080
```

## Composer

You can run [Composer](https://getcomposer.org) commands with Diode, passing in the full command you want after `diode`.

```bash
diode composer require aschmelyun/larametrics
```

## Why Build This?

Getting started developing PHP applications can be notoriously tricky compared with other languages like JavaScript.

Installing PHP locally has a history of being difficult depending on the OS you're using, and Docker exists but is a bit complicated for new developers.

I built Diode as a kind of quick-start tool to spin up a local environment and get you hitting the ground running when working with Laravel.

If you find yourself wanting more out of a local environment, I suggest trying out something like [Docker](https://www.docker.com/) or [Lando](https://lando.dev/) as the next step!

## Contact

Have an issue? [Submit it here!](https://github.com/aschmelyun/diode/issues/new) Want to get in touch or recommend a feature? Feel free to reach out to me on [Twitter](https://twitter.com/aschmelyun) for any other questions or comments.

## License

This software is licensed under The MIT License (MIT). See [LICENSE.md](LICENSE.md) for more details.