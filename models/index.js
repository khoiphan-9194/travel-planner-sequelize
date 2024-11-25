//Many to Many relationship
const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

// Create associations
// Traveller belongsToMany Location is a many-to-many relationship that 
// creates a join table called Trip with foreign keys for traveller_id and location_id
// the name of the table is 'planned_trips'
// many-to-many relationships are defined by the belongsToMany() method
// in the Traveller model, we define the relationship to the Location model through the Trip model
// so that a Traveller can have many Locations through the Trip model and get data from the Location model
Traveller.belongsToMany(Location,{
 through: {
   model: Trip,
   unique: false //there can be multiple trips from the same traveller to the same location but with different trip budgets
   //trip id is the primary key for the Trip model
 },
 foreignKey: 'traveller_id', //this is the foreign key for the Traveller model
 onDelete: 'SET NULL', //if a traveller is deleted, the associated trips will have their traveller_id set to null
 
    as: 'planned_trips' //this is the alias for the Location model
});

Location.belongsToMany(Traveller,{
    through: {
        model: Trip,
        unique: false
    },
    foreignKey: 'location_id',
    onDelete: 'SET NULL',
    as: 'travel_locations'
    
});

Trip.belongsTo(Traveller,{
    foreignKey: 'traveller_id'
});

Trip.belongsTo(Location,{
    foreignKey: 'location_id'
});


// Export the models
module.exports = { Traveller, Location, Trip };


