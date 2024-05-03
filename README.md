# mechcloud-demo-microapp1
This demo micro app provides a number of components (Frames, Layouts, External Pages and Generic) which can be consumed in MechCloud sites from a remote deployment.

**These components are hosted at `https://demo-microapp1.mechcloud.io` too and so you can skip local setup section if you just want to experience these components in a MechCloud site without any modification.** 
* These components are already registered under `Default (Managed)` team and so these will be visible if you are using page designer for a site page created under this team.
* If you have created your own custom team then make sure you register these components under relevent pages (Site Builder -> Frames / Components) before these components are visible while creating a site or on the page designer.

## Local setup instructions
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
You can configure a micro app at either team or site level. All sites under a team inherit this configuration from the parent team and can override it too as shown below -

![image](https://github.com/mechcloud/mechcloud-demo-microapp1/assets/4586024/6d181005-2845-4312-8aa7-cffe106b6289)


### Consuming components from hosted location
* Configure this micro app at either team or site level under `Custom Components Host` field using `https://demo-microapp1.mechcloud.io` as its value.

### Consuming components from local setup
* This repository is using a certicate located under `certs/server` for vite preview server which is signed by a certificate located under `certs/ca` folder. So you can either import this certificate in the trust store of your operating system or simply open `https://microapp1.mechcloud.lab:8080/vue-components.mjs` url in the browser and accept the self-signed certificate temporarily.  

* Configure this micro app at either team or site level under `Custom Components Host` field using `https://microapp1.mechcloud.lab:8080` as its value.

## Tutorials
https://docs.mechcloud.io/piston/tutorials

