# Nested Filter Example

This is a small application to demonstrate the use of [jpnut/eloquent-nested-filter](https://github.com/jpnut/eloquent-nested-filter).

## Installation

To get started, you'll need a PHP server up and running, and node if you want to build the front-end assets. If you are familiar with docker, something like [this](https://github.com/jpnut/laravel-docker) should work fine. This application was built with PostgreSQL in mind, but should work with MySQL/SQLite also.

You'll also need to create an environment file, an example of which can be found at `.env.example`.

To install the composer dependencies, run:

```
composer install
```

To run the migrations and seed the application with some random data, run:

```
php artisan migrate --seed
```

To build the front end assets, run:

`yarn` followed by `yarn dev` or `yarn prod`

Good to go!


## Authentication

Whilst the authentication scaffolding is in place, the application does not currently make use of authentication to protect any routes.

## Tests

```
php artisan test
```

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.