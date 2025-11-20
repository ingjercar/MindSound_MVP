import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Artist = sequelize.define("Artist", {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  slug: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  bio: { type: DataTypes.TEXT, allowNull: true },
  image_url: { type: DataTypes.STRING(1024), allowNull: true }
}, { tableName: "artists" });

export default Artist;
