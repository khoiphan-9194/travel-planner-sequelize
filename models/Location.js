const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Location extends Model {
      // This instance method uses the this keyword to access the traveller's name and email properties
                location_Name() {
        return `Welcome to ${this.location_name}!`;
      }
}

Location.init(
{
    id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
  location_name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
            len: {
                args: [2],
                msg: 'Location name must be at least 2 characters long.'
            }
        },
    }

},
{
    hooks:{
        beforeCreate: async (LocationData) => {
            LocationData.location_name = LocationData.location_name.replace(/\b\w/g, char => char.toUpperCase());
            //is a regular expression that will capitalize the first letter of each word in the traveller_name string.
            return LocationData; //return the updated data
        }
        
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'location',
}

);

module.exports = Location;