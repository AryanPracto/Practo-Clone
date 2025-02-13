const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db.js");
const Doctor = require("./doctor.model.js");
const Clinic = require("./clinic.model.js");

const Slot = sequelize.define(
  "Slot",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "doctors", // Use table name instead of model reference in CJS
        key: "id",
      },
      onDelete: "CASCADE",
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clinics", // Use table name
        key: "id",
      },
      onDelete: "CASCADE",
    },
    date: {
      type: DataTypes.DATEONLY, // Stores only date (YYYY-MM-DD)
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME, // Stores time (HH:MM:SS)
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Available", "Booked"),
      defaultValue: "Available",
    },
  },
  {
    tableName: "slots",
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// **Associations**
Doctor.hasMany(Slot, { foreignKey: "doctorId" });
Clinic.hasMany(Slot, { foreignKey: "clinicId" });

Slot.belongsTo(Doctor, { foreignKey: "doctorId" });
Slot.belongsTo(Clinic, { foreignKey: "clinicId" });

module.exports = Slot;
