# tick-htmengine [![Build Status](https://travis-ci.org/DanielMontesDeOca/tick-htmengine.svg?branch=master)](https://travis-ci.org/DanielMontesDeOca/tick-htmengine)

Experimenting with the TICK stack and HTMEngine.

Setup

```
cd docker
docker-compose up -d
```

Run tests

```
cd docker
docker-compose up -d
docker-compose -f docker-compose.yml -f docker-compose.test.yml run integration-tests
```
