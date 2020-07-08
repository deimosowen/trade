/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s_routes_stage', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Первичный ключ",
      primaryKey: true
    },
    'stage_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование этапа"
    }
  }, {
    tableName: 's_routes_stage'
  });
};
