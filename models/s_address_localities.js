/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s_address_localities', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    's_address_regions_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Регион/штат/ область",
      references: {
          'model': 's_address_regions',
          'key': 's_address_regions_id'
      }
    },
    'locality_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование"
    }
  }, {
    tableName: 's_address_localities'
  });
};
