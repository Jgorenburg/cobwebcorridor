var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var appRoot = require('app-root-path');

class Image {
    constructor(alt, loc) {
        this.alt = alt
        this.src = loc
    }
}

router.get('/:type/:title', function (req, res, next) {
    console.log(req.params)

    fs.readdir(path.join(appRoot.toString(), '/public/images', req.path), (err, files) => {
        if (err) {
            console.error('Error loading images:', err);
            next();
            return;
        }
        //files.forEach(image => console.log(image))
        const fimages = files.map(file => new Image(path.parse(file).name, path.join("/images", req.path, file)))
        //fimages.forEach(image => console.log(image))
        const title = req.params.title;

        res.render('photography/template', {
            title: title[0].toLocaleUpperCase() + title.substring(1).toLocaleLowerCase(),
            album: fimages
        });
    });
});

// TODO: make landing page for photography
router.get('/*', function (_, res, next) {
    console.log("salmon")
    res.render('index', { title: 'Photography' });
});

module.exports = router;
