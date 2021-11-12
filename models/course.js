'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  course.init({
    author: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    isDelete: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};