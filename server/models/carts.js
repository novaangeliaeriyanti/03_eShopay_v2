const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('carts', {
    cart_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cart_createdon: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cart_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    cart_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'carts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "carts_pkey",
        unique: true,
        fields: [
          { name: "cart_id" },
        ]
      },
    ]
  });
};
