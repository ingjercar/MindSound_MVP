import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Role from "./Role.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  last_login: { type: DataTypes.DATE, allowNull: true }
}, { tableName: "users" });


User.belongsTo(Role, { foreignKey: { name: "role_id", allowNull: false }, as: "role" });
Role.hasMany(User, { foreignKey: "role_id", as: "users" });

export default User;
