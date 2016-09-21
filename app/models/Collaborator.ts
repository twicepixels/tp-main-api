/**
 * Created by Juanjo on 20/09/2016.
 */
import { SequenceService } from "../services/sequence.service";
let sequenceService: SequenceService = new SequenceService();


module.exports = (sequelize:any, DataTypes:any)=> {
  return sequelize.define('collaborator', {
      id: {
        field: "collaboratorId",
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      identityCard: {
        type: DataTypes.STRING,
        unique: true,
        validate: {notEmpty: true}
      },
      address1: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      address2: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      postalCode: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      rating: DataTypes.INTEGER,
      picture: DataTypes.STRING,
      authorized: {
        type: DataTypes.BOOLEAN,
        validate: {notEmpty: true}
      },
      accountId: {
        type: DataTypes.INTEGER,
        validate: {notEmpty: true}
      },
      countryId: {
        type: DataTypes.INTEGER,
        validate: {notEmpty: true}
      },
      description: DataTypes.STRING,

    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "customer_collaborator",
      hooks: {
        beforeCreate: (collaborator: any, options: any, next: any)=> {
          sequenceService.getNextSequence("customer_collaborator") 
            .then((result: any)=> {
              collaborator.id = result.id;
              next(null, collaborator);
            }, (error)=>next(error));
        }
      }
    }
  );
};

