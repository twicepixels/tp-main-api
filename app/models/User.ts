import { CryptoService } from "../../base/crypto.service";
module.exports = (sequelize: any, DataTypes: any)=> {
  return sequelize.define('User', {
      id: {
        field: "userId",
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userName: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {notEmpty: true, isEmail: true}
      },
      password: {
        type: DataTypes.STRING,
        validate: {notEmpty: true, min: 8}
      },
      accountId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      location: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      verifiedAt: DataTypes.DATE
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "customer_user",
      hooks: {
        beforeCreate: (user: any, options: any, next: any)=> {
          CryptoService.crypt(user.password, (error, result)=> {
            user.createdAt = new Date();
            user.password = result;
            next(error);
          });
        }
      }
    });
};
