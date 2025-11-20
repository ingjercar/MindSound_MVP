import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB, sequelize } from "./config/db.js";
import { Role } from "./models/index.js";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import artistsRoutes from "./routes/artists.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/artists", artistsRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB();

  // sincronizar modelos
  await sequelize.sync({ alter: true }); // para desarrollo; en producción usa migrations
  console.log("✅ Modelos sincronizados");

  // crear roles base si no existen
  const roles = ["admin", "artist", "user"];
  for (const r of roles) {
    const found = await Role.findOne({ where: { name: r } });
    if (!found) await Role.create({ name: r, description: `${r} role` });
  }

  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
};

start();
