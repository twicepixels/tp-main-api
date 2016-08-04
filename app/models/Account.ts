module.exports = function (sequelize: any, DataTypes: any) {
  return sequelize.define('Account', {
      id: {
        field: 'accountId',
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      typeAccountId: {
        type: DataTypes.INTEGER,
        validate: {notEmpty: true}
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "customer_account"
    });
};

