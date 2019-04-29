
const Vhc = require('../../models/vehicle/apiFetch/vehicle');
const MnfMaxId =  require('./../vhcFindMaxId');

const Request = require("request");

const sortByID = require('../sortById.js');




MnfMaxId.findAll(function(err,doc){

    if(err){
        console.log(err)
    }

    mnfId = JSON.stringify(doc);
    const regex = mnfId.replace(/}/gi, "");
    const token = regex.replace(/{"id":/gi, "");
    const teka = JSON.parse(token)

    function logArrayElements(element, index, array) {
        console.log(element)
        Request.get("http://fipeapi.appspot.com/api/1/carros/veiculos/" + element + ".json", function (err, response, body) {
            if (err) {

                console.dir("error?",err);
            }


            const reqBody = JSON.parse(body);

            var query = Vhc.find({});
            query.sort('id');

            query.select('name fipe_name marca fipe_marca key id -_id');

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


                    let keys = Object.keys(docSort.reduce((a, {name, fipe_name, marca, fipe_marca, key, id}) => Object.assign(a, {[name + "_" +  fipe_name+ "_" +  marca+ "_" +  fipe_marca+ "_" +  key+ "_" +  id]: undefined}), {}));


                    let filtered = reqSort.filter(({name, fipe_name, marca, fipe_marca, key, id}) => !keys.includes(name + "_" +  fipe_name+ "_" +  marca+ "_" +  fipe_marca+ "_" +  key+ "_" +  id));

                    Vhc.create(filtered, function (err, doc) {
                        if (err) {
                            console.log(err)
                        }
                        console.log(doc)
                    })


                }


            })



        })
    }
    teka.forEach(logArrayElements);

});



