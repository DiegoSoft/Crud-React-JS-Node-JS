'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Saidas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Saidas.init({
    tipo_producto: DataTypes.STRING,
    nome: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    lt_kl_unid: DataTypes.STRING,
    marca: DataTypes.STRING,
    status: DataTypes.INTEGER,
    saida: DataTypes.INTEGER
   
  }, {
    sequelize,
    modelName: 'Saidas',
  });
  return Saidas;
};