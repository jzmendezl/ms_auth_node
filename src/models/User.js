import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";
import bcrypt from "bcryptjs";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        validation: {
            isDate: true,
          }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
});



// User.pre("save", async function (next) {
//     const user = this;
//     if (!user.isModified("password")) {
//         return next();
//     }
//     const hash = await bcrypt.hash(user.password, 10);
//     user.password = hash;
//     next();
// })

// User.methods.isValidPassword = async function (password) {
//     const user = this;
//     const compare = await bcrypt.compare(password, user.password);
//     return compare;
// }
