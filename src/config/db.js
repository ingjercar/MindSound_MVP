
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const createMySql = () => new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 26458,
    dialect: "mysql",
    logging: false,
    define: { timestamps: true, underscored: false }
  }
);
const createSqlite = () => new Sequelize({ dialect: 'sqlite', storage: ':memory:', logging: false, define: { timestamps: true } });

// instantiate sequelize immediately so models can define themselves at import time
const sequelize = process.env.DB_HOST ? createMySql() : createSqlite();

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(process.env.DB_HOST ? "✅ MySQL conectado" : "✅ SQLite conectado");
    return sequelize;
  } catch (err) {
    console.error("❌ Error conectando DB:", err.message);
    // If MySQL was configured but failed, exit so developer can fix connection
    if (process.env.DB_HOST) process.exit(1);
    process.exit(1);
  }
};

export { sequelize };
