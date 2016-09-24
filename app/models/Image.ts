import { SequenceService } from "../services/sequence.service";
let sequenceService: SequenceService = new SequenceService();

module.exports = function (sequelize: any, DataTypes: any) {
  return sequelize.define('Image', {
      id: {
        field: 'imageId',
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      typeId: {
        field: 'imageTypeId',
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      description: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      }
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "media_image",
      hooks: {
        beforeCreate: (image: any, options: any, next: any)=> {
          sequenceService.getNextSequence("collaborator_image")
            .then((result: any)=> {
              image.id = result.id;
              next(null, image);
            }, (error)=>next(error));
        }
      }
    });
};

