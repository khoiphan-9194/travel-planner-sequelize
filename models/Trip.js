const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Trip extends Model {}


Trip.init(
{
    id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    trip_budget:
    {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate:
        {
            isDecimal: true,
        },
    },

    traveller_amount: //this is the number of travellers
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:
        {
            isNumeric: true, // will only allow numbers
        },
    },
    traveller_id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:
        {
            model: 'traveller',
            key: 'id'
        }
    },
    
    location_id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:
        {
            model: 'location',
            key: 'id'
        }
    }  
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip',
}
);

module.exports = Trip;