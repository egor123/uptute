# frontend

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy dist

```
rsync -avP --delete -e ssh frontend/dist/  ec2-user@ec2-54-93-234-239.eu-central-1.compute.amazonaws.com:public_html
```
