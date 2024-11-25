//One to Many relationship

const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

Traveller.hasMany(Trip, {
  foreignKey: 'traveller_id',
  onDelete: 'CASCADE'
});

Trip.belongsTo(Traveller, {
    foreignKey: 'traveller_id'
    });

Location.hasMany(Trip, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'

    });

Trip.belongsTo(Location, {
    foreignKey: 'location_id'
    });
// Export the models
module.exports = { Traveller, Location, Trip };


