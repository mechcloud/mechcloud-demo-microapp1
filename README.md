# mechcloud-demo-microapp1
Demo micro app for MechCloud website builder

## Setup instructions
* Clone this repository.
* Install dependencies -
```
cd mechcloud-demo-microapp1
yarn install
```

* Build micro app -
```
yarn build
```

* Launch preview server -
```
yarn preview
```

* Add an entry into your hosts file -
```
127.0.0.1 microapp1.mechcloud.lab
```

Now this microapp can be accessed at https://microapp1.mechcloud.lab:8080 url.

## Configure this micro app in MechCloud
* This repository is using a certicate located under `certs/server` for vite previer server which is signed by a certificate located under `certs/ca` folder. So you can either import this certificate in the trust store of your operating system or simply open `https://microapp1.mechcloud.lab:8080/vue-components.mjs` url in the browser and accept the self-signed certificate temporarily.  

* Configure this micro app at either team or site level under `Custom Components Host` field using `https://microapp1.mechcloud.lab:8080/vue-components.mjs` as its value.

