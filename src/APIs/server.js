const express = require("express");
const cors = require('cors');
const httpProxy = require('http-proxy'); 

const app = express()
const port = 8080

app.set('x-powered-by' , 'Express.js');
app.use(cors());

//Use this options for creating a reverse proxy to other domains.
const options = {
    changeOrigin: true,
    target: {
        https: true
    }
}

//Create a reverse proxy server
const apiProxy = httpProxy.createProxyServer(options);

const devTremendousServer = 'https://testflight.tremendous.com'; 
// const prodTremendousServer = 'https://tremendous.com';


app.get('/api/v2/funding_sources', (req, res) => {
    console.log(`redirecting to Tremendous ${req.url}`)
    apiProxy.web(req, res, {target: devTremendousServer})
})

app.post('/api/v2/orders', (req, res) => {
    console.log(`redirecting to Tremendous ${req.url}`)
    apiProxy.web(req, res, {target: devTremendousServer})
})


//Start the server
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})
