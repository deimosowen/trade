/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s_role', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Первичный ключ",
      primaryKey: true
    },
    'role_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование роли"
    }
  }, {
    tableName: 's_role'
  });
};
