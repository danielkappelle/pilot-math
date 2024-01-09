# Pilot Math

Mental math questions for aspiring pilots. Questions include fuel calculations, distance, climb, descent calculations as well as wind components.

# Running

Set node version, if you have nvm:

```sh
nvm use
```

Install packages

```sh
npm i
```

Run

```sh
npm start
```

# Building docker image

Set environment variable `$DOCKER_IMAGE_HOST` to whatever your docker image host will be (e.g. ghcr.io/yourusername). I.e. by sourcing a .env var or just exporting it.

Build docker image

```sh
npm run docker:build
```

Push the docker image

```sh
npm run docker:push
```
