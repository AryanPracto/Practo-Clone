const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db.js");

const Clinic = sequelize.define(
  "Clinic",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workingDays: {
      type: DataTypes.STRING, // Example: "Mon-Fri" or "Mon,Wed,Fri"
      allowNull: false,
    },
    openingTime: {
      type: DataTypes.TIME, // Example: "09:00:00"
      allowNull: false,
    },
    closingTime: {
      type: DataTypes.TIME, // Example: "18:00:00"
      allowNull: false,
    },
    fee: {
      type: DataTypes.INTEGER, // Example: 500.00
      allowNull: false,
    },
  },
  {
    tableName: "clinics",
    timestamps: true,
  }
);

module.exports = Clinic;
