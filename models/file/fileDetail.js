
'use strict'
module.exports = function(sequelize,DataTypes){
    const fileDetail = sequelize.define('fileDetail',{
                thumbnail:{
                    type: DataTypes.STRING 
                },
                originalname: {
                    type: DataTypes.STRING // 指定值的类型
                    //field: 'UserName' // 指定存储在表中的键名称 没有指定 field，表中键名称则与对象键名相同，为 email
                },
                filename:{
                    type: DataTypes.STRING
                },
                path: {
                    type: DataTypes.STRING
                },
                size: {
                    type: DataTypes.INTEGER                                          
                },
                fieldname: {
                    type: DataTypes.INTEGER    
                }
                // fileType: {
                //     type: DataTypes.STRING
                // }
            },
            {
                // 如果为 true 则表的名称和 model 相同，即 user
                // 为 false MySQL 创建的表名称会是复数 users
                // 如果指定的表名称本就是复数形式则不变
                freezeTableName: true
            })
    return fileDetail;
};