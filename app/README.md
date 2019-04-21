# SimpliFi Front End

## Get Started

#### Create environment file
```touch src/environment.js```

#### Import Firebase Credentials
```js
const config = {
  firebase: {
    apiKey: "<api-key>",
    authDomain: "<auth-domain>",
    databaseURL: "<db-url>",
    projectId: "<project-id>",
    storageBucket: "<storage-bucket>",
    messagingSenderId: "<messaging-id>"
  }
}

export default config;

```

#### Serve front end
``` npm start ```

#### Made for DragonHacks 2019
