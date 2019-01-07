const express = require('express');
const  bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

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




const port = process.env.PORT || 3005;

app.listen(port,()=>console.log('listen'+ port));


