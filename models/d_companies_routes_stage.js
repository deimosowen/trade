/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_companies_routes_stage', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'd_companies_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Компания",
      references: {
          'model': 'd_companies',
          'key': 'd_companies_id'
      }
    },
    'stage_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование этапа"
    },
    'count_day_execution': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Cрок исполнения(дни)"
    }
  }, {
    tableName: 'd_companies_routes_stage'
  });
};
