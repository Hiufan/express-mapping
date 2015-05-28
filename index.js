var walk = require('walk');
var path = require('path');
var router = require('express').Router();

module.exports = function (directory) {
    var files = [];

    var walker = walk.walk(directory, {followLinks: false});

    walker.on('file', function (root, stat, next) {
        var extname = path.extname(stat.name),
            basename = path.basename(stat.name, extname);

        if (extname === '.js') {
            var mod = require('../../' + directory + '/' + basename);
            var routes = Object.keys(mod);

            routes.forEach(function (key) {
                if (key !== 'mapping') {
                    var methods = Object.keys(mod[key]);
                    methods.forEach(function (path) {
                        files.push({
                            path: mod.mapping ? mod.mapping + path : path,
                            method: key,
                            handler: mod[key][path]
                        });
                    });
                }
            });
        }
        next();
    });

    walker.on('end', function () {
        if (files.length === 0) {
            console.info('No Routes Founded');
        } else {
            try {
                files.forEach(function (item) {
                    router[item.method](item.path,item.handler);
                    console.info(item.method.toUpperCase() + ':' + item.path);
                });
                console.info(files.length + ' Routes Has Registered');
            } catch (e) {
                console.error(e);
            }
        }
    });

    return router;
};
