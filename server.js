const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

const bundle = require('./dist/js/server.bundle.js');
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./dist/index.html', 'utf-8')
});

app.use("/dist", express.static(path.join(__dirname, './dist')));

app.get('/', (req, res) => {
    bundle.default({ url: req.url }).then((app) => {
        const context = {
            title: 'Vue JS - Server Render',
            meta: ` <meta description="vuejs server side render"> `
        };
        renderer.renderToString(app, context, function (err, html) {
            if (!err) return res.end(html);
            if (err.code === 404) {
                res.status(404).end('Page not found')
            } else {
                res.status(500).end('Internal Server Error')
            }
        });

    }, (err) => {
        console.log('error:', err);
    });
});

const server = app.listen(process.env.PORT || 8080, () => {
    console.log('listening on port ', server.address().port);
    console.log('url ', `http://localhost:${server.address().port}`);
});
