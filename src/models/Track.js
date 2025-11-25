import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Track = sequelize.define("Track", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    }
    ,
    album_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    artist_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    title: { type: DataTypes.STRING(512), allowNull: false },
    duration_seconds: { type: DataTypes.INTEGER.UNSIGNED },
    audio_url: { type: DataTypes.STRING(1024) },
    is_explicit: { type: DataTypes.BOOLEAN, defaultValue: false },
    track_number: { type: DataTypes.SMALLINT }
}, {
    tableName: "tracks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
});
