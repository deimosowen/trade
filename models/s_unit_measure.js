/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s_unit_measure', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Первичный ключ",
      primaryKey: true
    },
    'unit_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование"
    }
  }, {
    tableName: 's_unit_measure'
  });
};
