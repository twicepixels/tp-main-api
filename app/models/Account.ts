import { SequenceService } from "../services/sequence.service";
let sequenceService: SequenceService = new SequenceService();

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
      },
      billingId: DataTypes.STRING
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "customer_account",
      hooks: {
        beforeCreate: (account: any, options: any, next: any)=> {
          sequenceService.getNextSequence("customer_account")
            .then((result: any)=> {
              account.id = result.id;
              next(null, account);
            }, (error)=>next(error));
        }
      }
    });
};

