/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_clients', {
    'id': {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: sequelize.fn('uuid_generate_v4'),
      comment: "Первичный ключ",
      primaryKey: true
    },
    'client_name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Наименование"
    },
    'address': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Адрес"
    },
    'email': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Электронная почта"
    },
    'phone_number1': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Номер телефона 1"
    },
    'phone_number2': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Номер телефона 2"
    }
  }, {
    tableName: 'd_clients'
  });
};
