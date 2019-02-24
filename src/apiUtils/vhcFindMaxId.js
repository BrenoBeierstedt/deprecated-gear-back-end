const Mnf = require('../models/vehicle/apiFetch/manufacturer');


module.exports.findMax = function (callback) {

    let query = Mnf.findOne({});
    query.sort('-id');

    query.select('id -_id');

    query.exec(function (err, doc) {

        if (err) {
            console.log("something went wrong", err)
        }


        callback (null,doc);
    });

    };
