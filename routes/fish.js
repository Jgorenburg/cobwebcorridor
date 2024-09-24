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

image1 = new Image("t1", "/images/_DSC1185.jpg")
image2 = new Image("t2", "https://static.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg")
images = [image1, image2]

router.get('/trout', function (req, res, next) {

    res.render('photography/template', {
        title: "Trout",
        album: images
    });
    console.log(appRoot.toString())
});

router.get('/cod', function (req, res, next) {
    console.log(req.path)

    fs.readdir(path.join(appRoot.toString(), '/public/images', req.path), (err, files) => {
        if (err) {
            console.error('Error loading images:', err);
            return;
        }
        //files.forEach(image => console.log(image))
        fimages = files.map(file => new Image(path.parse(file).name, path.join("/images", req.path, file)))
        //fimages.forEach(image => console.log(image))
        res.render('photography/template', {
            title: "Cod",
            album: fimages
        });
    });
});

router.get('/ayo', function (req, res, next) {
    console.log(req.path)

    files = fs.readdirSync(path.join(appRoot.toString(), '/public/images', req.path))

    //files.forEach(image => console.log(image))
    fimages = files.map(file => new Image(path.parse(file).name, path.join("/images", req.path, file)))
    //fimages.forEach(image => console.log(image))
    res.render('photography/template', {
        title: "Cod",
        album: fimages
    });
});

module.exports = router;
