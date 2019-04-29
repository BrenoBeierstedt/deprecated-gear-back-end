const express = require('express');
const  bodyParser = require('body-parser');
const { promisify } = require('util');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.get('/', (req,res)=>{

    res.send('OK');


});



require('./src/controllers/auth/authController')(app);
require('./src/controllers/vehicle/api/mnfController')(app);
require('./src/controllers/address/addController')(app);
require('./src/controllers/employee/empController')(app);
require('./src/controllers/customer/cusController')(app);
require('./src/controllers/vehicle/api/vhpController')(app);
require('./src/controllers/provider/pvdController')(app);
require('./src/controllers/inventory/product/proController')(app);
require('./src/controllers/inventory/part/prtController')(app);
require('./src/controllers/service/inProgress/sipController')(app);
require('./src/controllers/vehicle/customerVehicle/cvnController')(app);
require('./src/controllers/service/commonService/csvController')(app);
require('./src/controllers/login/usrController')(app);


require('./src/controllers/customer/searchTest')(app);

const startServer = async () => {
    const port = process.env.SERVER_PORT || 3005;
    await promisify(app.listen).bind(app)(port);
    console.log(`Listening on port ${port}`)
};

startServer();
