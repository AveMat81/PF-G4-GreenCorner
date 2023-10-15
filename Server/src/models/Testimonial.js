const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Testimonial",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
