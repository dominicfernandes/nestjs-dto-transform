# Get Data from Different Providers and Tranform using Nestjs DTO Decorators

## Description
Used Factory Pattern to get different providers and then get the data using the interface method. The job is in the OfferService which runs every 10 seconds. If the offer exists in the database, it will not add again. If a DTO validation fails, it will skip it and move to the next one.

## Setup
This is a dockerized app.

```bash
docker compose build
docker compose up
```