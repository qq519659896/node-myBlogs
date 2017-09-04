
'use strict'
module.exports = function(sequelize,DataTypes){
    const userLogin = sequelize.define('userLogin',{
        LoginName: {
            type: DataTypes.STRING, // 指定值的类型
            //field: 'UserName' // 指定存储在表中的键名称 没有指定 field，表中键名称则与对象键名相同，为 email
        },
        Password: {
            type: DataTypes.STRING
        },
        Email: {
            type: DataTypes.STRING
        },
        UserName: {
            type: DataTypes.STRING
        }
    }, {
        
        freezeTableName: true
    })
    return userLogin;
};