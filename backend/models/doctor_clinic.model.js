const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db.js");
const Doctor = require("./doctor.model.js");
const Clinic = require("./clinic.model.js");

const DoctorClinic = sequelize.define(
  "DoctorClinic",
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
  },
  {
    tableName: "doctor_clinic",
    timestamps: false, // Since this is just a mapping table
  }
);

// Establish Many-to-Many Relationship
Doctor.belongsToMany(Clinic, { through: DoctorClinic, foreignKey: "doctorId" });
Clinic.belongsToMany(Doctor, { through: DoctorClinic, foreignKey: "clinicId" });

module.exports = DoctorClinic;
