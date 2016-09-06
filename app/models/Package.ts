/**
 * Created by Juanjo on 31/08/2016.
 */

import { SequenceService } from "../services/sequence.service";
let sequenceService: SequenceService = new SequenceService();

module.exports = function (sequelize: any, DataTypes: any) {
  return sequelize.define('Package', {
      id: {
        field: 'packageId',
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      amountDownloads: {
        type: DataTypes.INTEGER,
        validate: {notEmpty: true}
      },

      intervalId: {
        type: DataTypes.INTEGER,
        validate: {notEmpty: true}
      },

      name: {
        type: DataTypes.STRING ,
        validate: {notEmpty: true}
      },

      amount: {
        type: DataTypes.INTEGER,
        validate: {notEmpty: true}
      },

      currency: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },

     interval_count: DataTypes.INTEGER
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "customer_package",
      hooks: {
        beforeCreate: (customerPackage: any, options: any, next: any)=> {
          sequenceService.getNextSequence("customer_package")
            .then((result: any)=> {
              customerPackage.id = result.id;
              console.log(result.id);
              next(null, customerPackage);
            }, (error)=>next(error));
        }
      }
    });
};

