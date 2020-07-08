/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s_routes_stage_next', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Первичный ключ",
      primaryKey: true
    },
    's_routes_stage_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Этап"
    },
    's_routes_stage_id_next': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Следующий этап"
    }
  }, {
    tableName: 's_routes_stage_next'
  });
};
