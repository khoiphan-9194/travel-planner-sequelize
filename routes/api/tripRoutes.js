const router = require('express').Router();
const { Traveller, Location, Trip } = require('../../models');
const sequelize = require('../../config/connection');

//get all trips,

router.get('/', async (req, res) => {
  try {
    const tripData = await Trip.findAll(
      {
          include: 
          [
             
              {model: Location, attributes: ['location_name']},


              {model: Traveller, attributes: ['traveller_name','email']}
          ],
          attributes: {exclude: ['location_id','traveller_id'],
          include: [
            [
              sequelize.literal(
                `(SELECT COUNT(trip.location_id) FROM trip WHERE trip.location_id = location.id)`
              ),
              'total trip from the same location ',
              
            ]
          ],
          include: [
            [
              sequelize.literal(
                `(SELECT SUM(trip.traveller_amount) FROM trip WHERE trip.location_id = location.id)`
              ),
              `total amount of travellers to the same location`

              
            ]
          ]
          }
      }
 
    );
    
    res.status(200).json(tripData);
   
  } catch (err) {
    res.status(500).json(err);
    
  }
});


// get a single trip

router.get('/:id', async (req, res) => {
    try {
        const tripData_ID = await Trip.findByPk(req.params.id, {

          include: 
          [
             
              {model: Location, attributes: ['location_name']},


              {model: Traveller, attributes: ['traveller_name','email']}
          ],
          attributes: {exclude: ['location_id','traveller_id'],
          include: [
            [
              sequelize.literal(
                `(SELECT COUNT(trip.location_id) FROM trip WHERE trip.location_id = location.id)`
              ),
              'total trip from the same location ',
              
            ]
          ],
          include: [
            [
              sequelize.literal(
                `(SELECT SUM(trip.traveller_amount) FROM trip WHERE trip.location_id = location.id)`
              ),
              `total amount of travellers to the same location`

              
            ]
          ]
          }
         
        });
        if (!tripData_ID) {
          res.status(404).json({ message: 'No trip found with this id!' });
        return;
        }
        res.status(200).json(tripData_ID);
    } catch (err) {
        res.status(500).json(err);
    }
    });

    // CREATE a trip
router.post('/', async (req, res) => {
    try {
      const newTrip = await Trip.create(req.body);
      res.status(200).json(newTrip);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // DELETE a trip
router.delete('/:id', async (req, res) => {
    try {
      const deletedTrip = await Trip.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!deletedTrip) {
        res.status(404).json({ message: 'No trip found with this id!' });
        return;
      }
  
      res.status(200).json(deletedTrip);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
module.exports = router;
