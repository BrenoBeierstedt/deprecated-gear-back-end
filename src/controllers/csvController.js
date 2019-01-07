const express = require('express');

const Csv = require('../models/commonService');



const router = express.Router();

//create

router.post('/common', async (req,res)=> {

    const csv = new Csv(req.body);

    csv
        .save()
        .then(result => {
            console.log(result);


        })
        .catch(err=>{
            return res.status(500);
            console.log("Problem creating new document")
        });
    res.status(201).json({
        message: "Succefully created",
        createdCommon: csv
    })
});

//alter

router.put('/common/:id',async (req, res)=>{
    Csv.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
        (err, csv)=>{
            if(err)return res.status(500).send(err);
            const response = {
                message: "Succefully updated",
                updatedtedCommon: csv
            };
            console.log("Alter on C300CSV ID:", req.params.id);
            return res.status(200).send(response);

        }
    )
});

//delete

router.delete('/common/:id', async(req,res)=>{

    Csv.findByIdAndRemove(req.params.id, (err,csv)=> {


        if (err) return res.status(500).send(err);
        const response = {
            message: "Register succefully deleted",
            id: Csv.id
        };
        return res.status(200).send(response);
    });

});

//select all

router.get('/common', async (req,res)=> {

        Csv.find({},function (err, doc) {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).send(err)
            }


        })
            .catch(err=>{
                return res.status(500).json({error:err});
            })
    }
);


//select by id
router.get('/common/:id', async (req,res)=> {

    Csv.findById(req.params.id,function (err, doc) {

        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'ID not valid'
            })
        }


    })
        .catch(err=>{
            return res.status(500).json({error:err});
        })




});






module.exports = app => app.use('/auth', router);