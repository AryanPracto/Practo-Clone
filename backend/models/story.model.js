const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db.js");
const Doctor = require("./doctor.model.js");

const Story = sequelize.define(
  "Story",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
  },
  {
    tableName: "stories",
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// **Associations**
Doctor.hasMany(Story, { foreignKey: "doctorId" });
Story.belongsTo(Doctor, { foreignKey: "doctorId" });

module.exports = Story;
