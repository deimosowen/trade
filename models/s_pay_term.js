/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s_pay_term', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Первичный ключ",
      primaryKey: true
    },
    'term_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование"
    }
  }, {
    tableName: 's_pay_term'
  });
};
