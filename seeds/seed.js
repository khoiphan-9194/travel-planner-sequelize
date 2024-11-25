const sequilize = require('../config/connection');
const{Location, Traveller, Trip} = require('../models');
const locationSeedData = require('./locationSeedData.json'); //importing the seed data
const travellerSeedData = require('./travellerSeedData.json'); //importing the seed data


const seedDatabase = async () => {
    await sequilize.sync({force: true}); //syncing the database
    const locations = await Location.bulkCreate(locationSeedData); //bulk creating the location data
    const travellers = await Traveller.bulkCreate(travellerSeedData); //bulk creating the traveller data
for (let index = 0; index < (Math.floor(Math.random() * (locations.length+travellers.length))); index++) {
//first way to get random id
 const randomTravellerID = travellers[Math.floor(Math.random() * travellers.length)].dataValues.id//randomly selecting a traveller
 
 //second way to get random id
 const {id: locationID} = locations[Math.floor(Math.random() * locations.length)]; //randomly selecting a location


await Trip.create({
    trip_budget: (Math.random() * 10000 + 1000).toFixed(2),
    traveller_amount: Math.floor(Math.random() * 10) + 1,
    traveller_id: randomTravellerID,
    location_id: locationID
}).catch((err) => {
    console.log(err);   

}
);
}

   
      


    if (!locations || !travellers) {
        console.log('There was an error seeding the database!');
        return;
    }
    console.log('Database seeded successfully!');

    process.exit(0);
}

seedDatabase();