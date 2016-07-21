var bcrypt = require('bcrypt');
module.exports = function (sequelize: any, DataTypes: any) {
  return sequelize.define('User', {
      id: {
        field: 'userId',
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        validate: {notEmpty: true}
      },
      email: {
        type: DataTypes.STRING,
        validate: {notEmpty: true, isEmail: true}
      },
      password: {
        type: DataTypes.STRING,
        validate: {notEmpty: true, min: 8}
      },
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
        beforeCreate: function (user: any, options: any) {
          user.createdAt = new Date();
          if (user.hasOwnProperty('password')) {
            bcrypt.genSalt(10, function (err: any, salt: string) {
              bcrypt.hash(user.password, salt, function (err: any, hash: string) {
                if (!err) {
                  user.password = hash;
                }
              });
            });
          }
        },
        beforeUpdate: function (user: any, options: any) {
          user.username = 'Toni'
        }
      }
    });
};
