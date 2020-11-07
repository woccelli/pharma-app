# pharma-app
MERN Web application for french medical workers to share simple information about common diseases

## Authors

* **William Occelli** - *Initial work* - (https://github.com/woccelli)

## References

* User authentification : https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

## Stack

M - MongoDB (MongoAtlas)

E - Express

R - Reactjs

N - Nodejs

## Get Started

Install Nodejs (https://nodejs.org/en/download/) - Version: 14.15.0
Install npm - Version: 6.14.8

```bash
npm install
npm run postinstall
```

Create a file backend/config/keys.js with content : 

```Javascript
module.exports = {
    mongoURI:"",
    secretOrKey: ""
};
```

Add your mongoURI to your Mongo database in backend/config/keys.js
Add you secretOrKey for the jwt token signing in backend/config/keys.js (cf. user authentication)

```bash
npm run dev
```

Project information (IP, port, status) is available in the node terminal.