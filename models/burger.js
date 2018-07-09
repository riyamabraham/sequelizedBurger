module.exports = function (sequelize, DataTypes) {
  var burger = sequelize.define("burger", {
    text: {
      type: DataTypes.STRING,
      allownull: false,
      validate: {
        len: {
          args: [1,140],
          msg: "Name must be atleast 1 characters in length and not more than 140"
        }
      }
    } ,
    devour:{
      type:DataTypes.BOOLEAN,
      
      defaultValue: false 
    } 
  
  });
  return burger;
};
