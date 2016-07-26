module.exports = function (sequelize: any, DataTypes: any) {
  return sequelize.define('Catalog', {
      id: {
        field: 'catalogId',
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      list: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      description: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      statusId: DataTypes.INTEGER,
      order: {
        field: 'orden',
        type: DataTypes.INTEGER
      },
      code: DataTypes.STRING,
      reference1: DataTypes.STRING,
      reference2: DataTypes.STRING,
      reference3: DataTypes.STRING
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "catalog"
    });
};
