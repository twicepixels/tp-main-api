//import { SequenceService } from "../services/sequence.service";
//let sequenceService: SequenceService = new SequenceService();

module.exports = function (sequelize: any, DataTypes: any) {
  return sequelize.define('Country', {
      id: {
        field: 'countryId',
        primaryKey: true,
        type: DataTypes.STRING
      },
      countryCode: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      description: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "general_country"/*,
      hooks: {
        beforeCreate: (account: any, options: any, next: any)=> {
          //sequenceService.getNextSequence("general_country")
          //  .then((result: any)=> {
          //    account.id = result.id;
          //    next(null, account);
          //  }, (error)=>next(error));
        }
      }*/
    });
};

