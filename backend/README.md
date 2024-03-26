# BEFOR START
* Create .env file like this

  ```
  DATABASE_HOST=db
  DATABASE_PORT=5432
  DATABASE_USERNAME=postgres
  DATABASE_PASSWORD=postgres
  DATABASE_NAME=db

  PGADMIN_DEFAULT_EMAIL=admin@admin.com
  PGADMIN_DEFAULT_PASSWORD=pgadmin4
  POSTGRES_PASSWORD=postgres
  ```

* Run
  ``` 
  docker compose build
  docker compose up
  ```
* create migration
  ```
     typeorm migration:create migration_name
  ```
* To execute migration, use the following command:
  ```
    npm run migration:run
  ```
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
