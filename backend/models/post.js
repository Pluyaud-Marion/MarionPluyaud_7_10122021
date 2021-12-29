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
      Relation 0 à plusieurs entre Post et Comment
      un Post peut avoir plusieurs Comment ou 0
      */
      models.Post.hasMany(models.Comment, {
        foreignKey : {
          allowNull : false
        },
        onDelete : 'CASCADE'
      });

      /*
      Relation 0 à plusieurs entre Post et User
      un Post appartient à un User
      */
      models.Post.belongsTo(models.User, {
        onDelete : 'CASCADE'
      });
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
    content: {
      allowNull: true,
      type: DataTypes.STRING
    },
    attachment: {
      allowNull: true,
      type: DataTypes.STRING
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
    //updatedAt: false,
    modelName: 'Post',
  });
  return Post;
};