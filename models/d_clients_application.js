/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('d_clients_application',
        {
            'id': {
                type: DataTypes.UUIDV4,
                allowNull: false,
                defaultValue: sequelize.fn('uuid_generate_v4'),
                comment: "Первичный ключ",
                primaryKey: true
            },
            'd_clients_id': {
                type: DataTypes.UUIDV4,
                allowNull: false,
                comment: "Клиент",
                references: {
                    'model': 'd_clients',
                    'key': 'd_clients_id'
                }
            },
            'application_number': {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'nextval(d_clients_application_number_seq::regclass)',
                comment: "Номер заявки"
            },
            'application_date': {
                type: DataTypes.DATEONLY,
                allowNull: false,
                comment: "Дата заявки"
            },
            'application_time': {
                type: DataTypes.TIME,
                allowNull: false,
                comment: "Время заявки"
            },
            'date_execution': {
                type: DataTypes.DATEONLY,
                allowNull: false,
                comment: "Дата исполнения"
            },
            'date_fact_execution': {
                type: DataTypes.DATEONLY,
                allowNull: true,
                comment: "Дата фактического исполнения"
            }
        },
        {
            tableName: 'd_clients_application'
        });
};