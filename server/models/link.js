'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      link.belongsTo(models.account, {
        as: "account",
        foreignKey: {
          name: "account_id",
        },
      });
    }
  }
  link.init({
    account_id: DataTypes.INTEGER,
    template_id: DataTypes.INTEGER,
    tanggal: DataTypes.DATEONLY,
    idZakat: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    link1: DataTypes.STRING,
    link2: DataTypes.STRING,
    link3: DataTypes.STRING,
    link4: DataTypes.STRING,
    link5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'link',
  });
  return link;
};