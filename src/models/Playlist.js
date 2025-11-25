import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";

export const Playlist = sequelize.define("Playlist", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: "playlists",
    timestamps: true,      // usa created_at / updated_at
    createdAt: "created_at",
    updatedAt: "updated_at"
});

// RELATION
Playlist.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Playlist, { foreignKey: "user_id" });
