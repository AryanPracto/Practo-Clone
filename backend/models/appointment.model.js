const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db.js");
const User = require("./user.model.js");
const Doctor = require("./doctor.model.js");
const Clinic = require("./clinic.model.js");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Doctor,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clinic,
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
    fee: {
      type: DataTypes.FLOAT, // Doctor’s consultation fee
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Scheduled", "Completed", "Cancelled"),
      defaultValue: "Scheduled",
    },
  },
  {
    tableName: "appointments",
    timestamps: true, // createdAt & updatedAt
  }
);

// **Associations**
User.hasMany(Appointment, { foreignKey: "userId" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId" });
Clinic.hasMany(Appointment, { foreignKey: "clinicId" });

Appointment.belongsTo(User, { foreignKey: "userId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });
Appointment.belongsTo(Clinic, { foreignKey: "clinicId" });

module.exports = Appointment;
