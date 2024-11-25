const router = require('express').Router();
const { Traveller, Location, Trip } = require('../../models');


//get all locations,

router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll({
      include: [
        {
          model: Traveller,
          through: { Trip, attributes: ['id','trip_budget','traveller_amount'] },
          as: 'travel_locations',
          // attributes: {
          //   exclude: ['id']
          // }
          
          
          
        }
      ]
      
      
    });
    
    res.status(200).json(locationData);
   
  } catch (err) {
    res.status(500).json(err);
    
  }
});


// get a single location

router.get('/:id', async (req, res) => {
    try {
        const locationData = await Location.findByPk(req.params.id, {
          include: [
            {
              model: Traveller,
              through: { Trip, attributes: ['id','trip_budget','traveller_amount'] },
              as: 'travel_locations', // this 'travel_locations' from the models/index.js when define relationship
        
              
            }
          ]
        });
        if (!locationData) {
          res.status(404).json({ message: 'No location found with this id!' });
        return;
        }
        res.status(200).json(locationData);
    } catch (err) {
        res.status(500).json(err);
    }
    });

    // CREATE a location
router.post('/', async (req, res) => {
    try {
      const newLocation = await Location.create(req.body);
      res.status(200).json(newLocation);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // DELETE a location
router.delete('/:id', async (req, res) => {
    try {
      const deletedLocation = await Location.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!deletedLocation) {
        res.status(404).json({ message: 'No location found with this id!' });
        return;
      }
  
      res.status(200).json(deletedLocation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
module.exports = router;
