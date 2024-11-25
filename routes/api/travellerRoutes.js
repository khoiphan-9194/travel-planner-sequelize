const router = require('express').Router();
const { Traveller, Location, Trip } = require('../../models');
const sequelize = require('../../config/connection');

//get all travellers,

router.get('/', async (req, res) => {
  try {
    const travellerData = await Traveller.findAll({
      include: [
        {
          model: Location,
          through: { Trip, attributes: ['id','trip_budget','traveller_amount'] },
          as: 'planned_trips',
          // attributes: {
          //   exclude: ['id']
          // }
          
          
        }
      ],
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT SUM(trip.trip_budget) FROM trip WHERE trip.traveller_id = traveller.id)`
            ),
            'total_trip='
          ]
        ]
        //  exclude: ['id','traveller_name','email']
      }
    });
    res.status(200).json(travellerData);
    //  console.log("++++++++++",travellerData[3].planned_trips[0].trip.dataValues.traveller_amount);
  } catch (err) {
    res.status(500).json(err);
    
  }
});


// get a single traveller

router.get('/:id', async (req, res) => {
    try {
        const travellerData = await Traveller.findByPk(req.params.id, {
        include: [
            {
            model: Location,
            through: { Trip, attributes: ['id','trip_budget','traveller_amount'] },
            as: 'planned_trips'
            // attributes: {
            //     exclude: ['id']
            // }
            }
        ],
        attributes: {
            include: [
            [
                sequelize.literal(
                `(SELECT SUM(trip.trip_budget) FROM trip WHERE trip.traveller_id = traveller.id)`
                ),
                'total_trip='
            ]
            ]
            //  exclude: ['id','traveller_name','email']
        }
        });
        if (!travellerData) {
          res.status(404).json({ message: 'No traveller found with this id!' });
        return;
        }
        res.status(200).json(travellerData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

    // CREATE a traveller
router.post('/', async (req, res) => {
    try {
      const travellerData = await Traveller.create(req.body);
      res.status(200).json(travellerData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // DELETE a traveller
router.delete('/:id', async (req, res) => {
    try {
      const travellerData = await Traveller.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!travellerData) {
        res.status(404).json({ message: 'No traveller found with this id!' });
        return;
      }
  
      res.status(200).json(travellerData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Update TravellerName

  router.put('/:id', async (req, res) => {
    try{
      const updatedTravellerData = await Traveller.update(req.body, {
        where: {
          id: req.params.id,
        },

        
      });
      if (!updatedTravellerData) {
        res.status(404).json({ message: 'No traveller found with that id!' });
        return;
      }
      else {
        res.status(200).json(updatedTravellerData);
      }
    }
    catch (err) {
      res.status(500).json(err);
    }
    });

    /* second option to update user info by destruct object req.body to 
       {
          traveller_name: req.body.traveller_name,
          email: req.body.email
        },
        -----------------
    
  router.put('/:id', async (req, res) => {
    try{
      const updatedTravellerData = await Traveller.update(
        {
          traveller_name: req.body.traveller_name,
          email: req.body.email
        },
        {
          where: 
          {
          id: req.params.id,
          },
        }
      );
      if (!updatedTravellerData) {
        res.status(404).json({ message: 'No traveller found with that id!' });
        return;
      }
      else {
        res.status(200).json(updatedTravellerData);
      }
    }
    catch (err) {
      res.status(500).json(err);
    }
    });
    */
module.exports = router;
