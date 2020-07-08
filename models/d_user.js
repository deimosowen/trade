/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_user', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'd_representatives_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Представитель"
    },
    'd_clients_id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      comment: "Клиент"
    },
    's_role_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Роль"
    },
    'user_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "ФИО пользователя"
    },
    'job_pos_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Должность"
    },
    'phone_number1': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Телефон 1"
    },
    'phone_number2': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Телефон 2"
    },
    'email': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Электронная почта"
    }
  }, {
    tableName: 'd_user'
  });
};
