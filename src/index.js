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



require('./controllers/authController')(app);
require('./controllers/vehicle/mnfController')(app);
require('./controllers/addController')(app);
require('./controllers/empController')(app);
require('./controllers/cusController')(app);
require('./controllers/pvdController')(app);
require('./controllers/proController')(app);
require('./controllers/prtController')(app);
require('./controllers/sipController')(app);
require('./controllers/cvnController')(app);
require('./controllers/csvController')(app);
require('./controllers/usrController')(app);




const startServer = async () => {
    const port = process.env.SERVER_PORT || 3005;
    await promisify(app.listen).bind(app)(port);
    console.log(`Listening on port ${port}`)
};

startServer();