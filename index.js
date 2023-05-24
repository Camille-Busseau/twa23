const express = require('express')
const app = express()
const fs = require('fs')
const request = require('request')
const path = require('path')

const { PORT } = require('./config.js')
const { API_KEY } = require('./config.js')


app.get('/culture=:id', function (req, res) {
    const culture = req.params.id
    // url que l'on va interroger
    const url = 'https://api.harvardartmuseums.org/object?culture='+culture+'&medium=2028387&q=imagepermissionlevel:0&size=20&apikey='+API_KEY;

    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, res, data) => {
        if (err) {
            console.log('error:', err);
        } else if (res.statusCode !== 200) {
            console.log('status:', res.statusCode)
        } else {
            const newData = JSON.stringify(data)
            // fs.readFile()
            fs.writeFile(__dirname + '/frontend/static/js/data/' +culture+ '.json', newData, err => {
                if (err) throw err
                console.log('success!')
            })
        }
    })
    res.end('Success')
})

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(PORT || 4001, () => {
    console.log('App is listening on port', PORT)
});

