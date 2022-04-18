'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      transaction.belongsTo(models.account, {
        as: "account",
        foreignKey: {
          name: "idUser",
        },
      });

      // transaction.belongsTo(models.type, {
      //   as: "type",
      //   foreignKey: {
      //     name: "idZakat",
      //   },
      // });

      
    }
  }
  transaction.init({
    name: DataTypes.STRING,
    tanggal: DataTypes.DATEONLY,
    idZakat: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    amil: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};