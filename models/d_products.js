/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_products', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'd_manufacturers_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Производитель",
      references: {
          'model': 'd_manufacturers',
          'key': 'd_manufacturers_id'
      }
    },
    'product_name': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Наименование"
    },
    's_unit_measure_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Единица измерения",
      references: {
          'model': 's_unit_measure',
          'key': 's_unit_measure_id'
      }
    }
  }, {
    tableName: 'd_products'
  });
};
