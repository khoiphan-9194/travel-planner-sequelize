const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Travellers extends Model {
      // This instance method uses the this keyword to access the traveller's name and email properties
      welcomeFromTraveller() {
        return `Hello! My name is ${this.traveller_name} and I am a traveller!
        Must be nice to be a traveller!, I can be reached at ${this.email}.`;
      }
}

Travellers.init(
{
    id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    traveller_name:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:
        {
        len: {
                args: [2],
                msg: "Traveller name must be at least 2 characters long."
              }
        },
    },
    email:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:
        {
            isEmail: {
                args: true,
                msg: "Please enter a valid email address",
            }
        },
    },

},
{
    hooks:{
        beforeCreate: async (newTravellerData) => {
            newTravellerData.email = await newTravellerData.email.toLowerCase();
            newTravellerData.traveller_name = newTravellerData.traveller_name.replace(/\b\w/g, char => char.toUpperCase());
            //newTravellerData.traveller_name.replace(/\b\w/g, char => char.toUpperCase()) 
            //is a regular expression that will capitalize the first letter of each word in the traveller_name string.
            return newTravellerData; //return the updated data
        }
        
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'traveller',
}
);

module.exports = Travellers;