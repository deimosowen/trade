/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_clients_application_pay', {
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
    'pay_number': {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'nextval(d_clients_application_price_number_seq::regclass)',
      comment: "Номер"
    },
    'pay_date': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "Дата оплаты"
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
      comment: "ФИО пользователя"
    }
  }, {
    tableName: 'd_clients_application_pay'
  });
};
