
const Vhp = require('../../models/vehicle/apiFetch/vehicleProps');


const Request = require("request");

const sortByID = require('../sortById.js');









Request.get("http://fipeapi.appspot.com/api/1/carros/veiculo"+".json", function (err, response, body) {
    if (err) {

        console.dir(err);
    }
    const reqBody = JSON.parse(body);



    var query = Vhp.find({});
    query.sort('id');

    query.select('name fipe_name order key id -_id');

    query.exec(function (err, doc) {

        if (err) {
            console.log("something went wrong", err)
        }
        const reqDoc = doc;

        const reqSort = reqBody.sort(sortByID.sortByProperty('id'));
        const docSort = reqDoc.sort(sortByID.sortByProperty('id'));


        if (JSON.stringify(reqSort) === JSON.stringify(docSort)) {
            console.log('Collection is up to date!');
        } else {


            let keys = Object.keys(docSort.reduce((a, {name, fipe_name,order,key,id}) => Object.assign(a, {[name+"_"+ fipe_name+"_"+order+"_"+key+"_"+id] : undefined}), {}));


            let filtered = reqSort.filter(({name, fipe_name,order,key,id}) => !keys.includes(name+"_"+ fipe_name+"_"+order+"_"+key+"_"+id));

            Vhp.create(filtered, function (err,doc) {
                if(err){
                    console.log(err)
                }
                console.log("Collection has been updated.")
            })

        }

    });

});






