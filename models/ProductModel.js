import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;
// Fungsi untuk menghasilkan string acak dengan panjang tertentu
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const Products = db.define('product', {
    // uuid:{
    //     type: DataTypes.STRING,
    //     defaultValue: DataTypes.UUIDV4,
    //     allowNull: false,
    //     validate:{
    //         notEmpty: true
    //     }
    // },
    uuid: {
        type: DataTypes.STRING,
        defaultValue: () => `PD-${generateRandomString(6)}`, // Menggunakan fungsi untuk menambahkan 'PT-' diikuti oleh string acak
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(Products);
Products.belongsTo(Users, { foreignKey: 'userId' });

export default Products;