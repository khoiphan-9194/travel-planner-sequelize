//One to Many relationship

const router = require('express').Router();
const { Model } = require('sequelize');
const {Traveller,Location,Trip} = require("../../models");
const e = require('express');

//get all travellers,

router.get("/",async(req,res)=>
{
    try{

        const travellerData = await Traveller.findAll(
            {
                include: 
                [
                    {model: Trip,
                    include: 
                    [
                        {model: Location}
                    ]
                    }
                ]
            }

            // {
            //     include:
            //     [
            //         {   model: Trip,
            //       // attributes: ['trip_budget','traveller_amount'],
            //         },   
            //     ]
            // }
       
);
        res.status(200).json(travellerData);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})



module.exports =router;