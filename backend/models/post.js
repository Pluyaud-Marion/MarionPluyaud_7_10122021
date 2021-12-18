'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /*
      //un User a plusieurs post / un post n'a qu'un user -> clé UserId dans table Post
      models.Post.belongsTo(models.User, {
        //foreignKey : UserId
        foreignKey: {
          allowNull: false
        },
        onDelete:'CASCADE'
      })
      // un Post a plusieur comment / un comment n'a qu'un post
      models.Post.hasMany(models.Comment)
      */

      // Relation 1 à plusieurs entre Post et Comment
      // un Post a plusieurs Comment
      models.Post.hasMany(models.Comment, {
        foreignKey : {
          allowNull : false
        },
        onDelete : 'CASCADE'
      });

      // Relation 1 à plusieurs entre Post et User
      // un Post appartient à un User
      models.Post.belongsTo(models.User);
    }
  };
  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    // userId:{
    //   allowNull: false,
    //   type: DataTypes.INTEGER,
    //   references : {
    //     model: 'Users',
    //     key: 'id'
    //   }
    //},
    title: {
      allowNull: true,
      type: DataTypes.STRING
    },
    content: {
      allowNull: true,
      type: DataTypes.STRING
    },
    attachment: {
      allowNull: true,
      type: DataTypes.STRING
    },
    like : {
      allowNull: true,
      defaultValue : 0,
      type : DataTypes.STRING
    },
    usersLiked : {
      allowNull : true,
      type : DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    updatedAt: false,
    modelName: 'Post',
  });
  return Post;
};