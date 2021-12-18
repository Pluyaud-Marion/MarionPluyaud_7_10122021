'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*
      //un User a plusieurs post / un post n'a qu'un user -> clé UserId dans table Post
      models.User.hasMany(models.Post);
      //un User a plusieurs comment / un comment n'a qu'un post -> clé UserId dans table Comment
      models.User.hasMany(models.Comment);
      */

      // Relation 1 à plusieurs entre User et Post
      // Un User peut faire plusieurs Post
      models.User.hasMany(models.Post, {
        foreignKey : {
          allowNull : false
        },
        onDelete : 'CASCADE'
      });

      //Relation 1 à plusieurs entre User et Comment
      // Un User peut faire plusieurs Comment
      models.User.hasMany(models.Comment, {
        foreignKey : {
          allowNull : false
        },
        onDelete : 'CASCADE'
      });

    }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique : true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    job: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isadmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue : false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};