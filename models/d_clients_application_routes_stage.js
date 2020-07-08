/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_clients_application_routes_stage', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'd_clients_application_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Заявка",
      references: {
          'model': 'd_clients_application',
          'key': 'd_clients_application_id'
      }
    },
    's_routes_stage_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Этап",
      references: {
          'model': 's_routes_stage',
          'key': 's_routes_stage_id'
      }
    },
    'd_user_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Пользователь",
      references: {
          'model': 'd_user',
          'key': 'd_user_id'
      }
    },
    'user_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование пользователя"
    },
    'stage_date': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
      comment: "Дата этапа"
    },
    'stage_time': {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
      comment: "Время этапа"
    },
    'date_execution': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Дата исполнения (регламентная)"
    },
    'date_fact_execution': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "Дата фактического исполнения"
    },
    'count_day_execution': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Cрок исполнения(дни)"
    },
    'time_fact_execution': {
      type: DataTypes.TIME,
      allowNull: true,
      comment: "Фактическое время"
    }
  }, {
    tableName: 'd_clients_application_routes_stage'
  });
};
