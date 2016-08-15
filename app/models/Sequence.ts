/**
 * Created by Gabriel on 03/08/2016.
 */
module.exports = function (sequelize: any, DataTypes: any) {
  return sequelize.define('Sequence', {
      id: {
        field: 'sequenceName',
        primaryKey: true,
        type: DataTypes.STRING
      },
      sequenceNumber: {
        type: DataTypes.INTEGER,
        validate: {notEmpty: true}
      },
      incrementNumber: {
        type: DataTypes.INTEGER,
        validate: {notEmpty: true}
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "general_sequence",
      defaultScope: {
        where: {
          statusId: 1
        }
      }
    });
};
