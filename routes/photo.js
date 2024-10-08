var express = require('express');
var path = require('path');
var fs = require('fs');
var appRoot = require('app-root-path');

var router = express.Router();

class Image {
    constructor(alt, loc) {
        this.alt = alt
        this.src = loc
    }
}

class Album {
    constructor(folder, name, image) {
        this.title = folder
        this.name = name
        this.thumbnail = image
    }
}

function makeImage(imagePath, fullPath) {
    var filename = path.parse(imagePath).name;
    const index = filename.indexOf('-');
    if (index > -1) {
        filename = filename.slice(index + 1);
    }
    return new Image(filename.replaceAll(constant.SPACE_EQUIVILANTS, " "), path.join("/images", fullPath, imagePath))
}

router.get('/:type(occasions|techniques)/:title', function (req, res, next) {
    // console.log(req.params)

    fs.readdir(path.join(appRoot.toString(), '/public/images', req.path), (err, files) => {
        if (err) {
            console.error('Error loading images:', err);
            next();
            return;
        }
        //files.forEach(image => console.log(image))
        const fimages = files.map(file => {
            return makeImage(file, req.path);
        });
        //fimages.forEach(image => console.log(image))
        const title = req.params.title;

        res.render('photography/album', {
            title: title[0].toLocaleUpperCase() + title.substring(1).toLocaleLowerCase(),
            album: fimages
        });
    });
});

// TODO: make landing page for photography
router.get('/*', function (req, res) {
    var occasions = [];
    var styles = []

    fs.readdirSync(path.join(appRoot.toString(), '/public/images/occasions')).forEach(album => {
        const images = fs.readdirSync(path.join(appRoot.toString(), '/public/images/occasions', album));
        const image = makeImage(images[0], path.join("/occasions", album));
        occasions.push(new Album(album, album.replaceAll(constant.SPACE_EQUIVILANTS, " "), image));
    });


    fs.readdirSync(path.join(appRoot.toString(), '/public/images/techniques')).forEach(album => {
        const images = fs.readdirSync(path.join(appRoot.toString(), '/public/images/techniques', album));
        const image = makeImage(images[0], path.join("/techniques", album));
        styles.push(new Album(album, album.replaceAll(constant.SPACE_EQUIVILANTS, " "), image));
    });

    // console.log(occasions)
    // console.log(styles)
    res.render('photography/gallery', { occasions: occasions, styles: styles });

});













module.exports = router;
