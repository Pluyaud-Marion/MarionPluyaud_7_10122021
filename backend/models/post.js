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
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
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
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};