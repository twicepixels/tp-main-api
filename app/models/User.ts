import { CryptoService } from "../../base/crypto.service";
import { SequenceService } from "../services/sequence.service";
let sequenceService: SequenceService = new SequenceService();

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
      countryId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      verifiedAt: DataTypes.DATE
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "customer_user",
      hooks: {
        beforeCreate: (user: any, options: any, next: any)=> {
          CryptoService.crypt(user.password).then(
            (hashedPassword: string)=> {
              user.createdAt = new Date();
              user.password = hashedPassword;
              sequenceService.getNextSequence("customer_user").then(
                (result: any)=> {
                  user.id = result.id;
                  next(null, user);
                }, (error)=>next(error)
              );
            }, (error)=>next(error)
          );
        }
      },
      instanceMethods: {
        toJSON: function () {
          var values = this.get();
          delete values.password;
          return values;
        }
      }
    });
};
