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



require('./controllers/auth/authController')(app);
require('./controllers/vehicle/api/mnfController')(app);
require('./controllers/address/addController')(app);
require('./controllers/employee/empController')(app);
require('./controllers/customer/cusController')(app);

require('./controllers/provider/pvdController')(app);
require('./controllers/inventory/product/proController')(app);
require('./controllers/inventory/part/prtController')(app);
require('./controllers/service/inProgress/sipController')(app);
require('./controllers/vehicle/customerVehicle/cvnController')(app);
require('./controllers/service/commonService/csvController')(app);
require('./controllers/login/usrController')(app);


require('./controllers/customer/searchTest')(app);

const startServer = async () => {
    const port = process.env.SERVER_PORT || 3005;
    await promisify(app.listen).bind(app)(port);
    console.log(`Listening on port ${port}`)
};

startServer();