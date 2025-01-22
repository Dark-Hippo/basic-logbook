# TODO

- Postgres DB docker container
- Docker compose for running the app and the DB
- Add a simple API to the app
- AWS IAM for the app

## Postgres DB docker container

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres
```

## Docker compose for running the app and the DB

```yaml
version: '3.1'

services:
  app:
    image: node:14
    working_dir: /app
    volumes:
      - .:/app
    ports:
      - '3000:3000'
    command: npm start
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/postgres

  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: postgres
```

## Development order of operations

1. DB container (see above)
2. Simple API as a directory in the project
3. CORS for the API
4. Simple API call from the app
5. AWS IAM for the app
6. DB user table
7. DB user table API
