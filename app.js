import mongoose from "mongoose";
import express from "express";
import butterflyRouter from "./routes/butterflyRoutes.js";
import cors from "cors";
import { connectDB, disconnectDB } from "./database/db_connection.js";


export const app = express();

// Middlewares
const origins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map(s => s.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Permite curl, Postman y healthchecks sin origin
    if (!origin) return callback(null, true);
    return origins.includes(origin)
      ? callback(null, true)
      : callback(new Error("CORS not allowed"), false);
  }
}));

// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Rutas
app.get("/health", (_req, res) => res.json({ ok: true }));
app.get("/", (_req, res) => res.send("Hola API"));
app.use("/butterflies", butterflyRouter);
app.get("/health/db", (_req, res) => {
  const state = ["disconnected","connected","connecting","disconnecting","uninitialized"][mongoose.connection.readyState] || "unknown";
  res.json({ dbState: state });
});

// Aliases estándar para orquestadores
app.get("/healthz", (_req, res) => res.json({ ok: true }));
app.get("/readyz", (_req, res) => {
  const state = ["disconnected","connected","connecting","disconnecting","uninitialized"][mongoose.connection.readyState] || "unknown";
  res.status(state === "connected" ? 200 : 503).json({ dbState: state });
});
// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// En tests NO levantamos servidor
let server = null;

if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await connectDB();                 //  Mongo
      console.log("🍃 Mongo conectado");
    } catch (error) {
      console.error("DB error:", error);
    }

    const PORT = process.env.PORT || 8080;
    server = app.listen(PORT, () => {
      console.log(`🚀 Server up at http://localhost:${PORT}/`);
    });

    process.on("SIGINT", async () => {
      await disconnectDB();
      process.exit(0);
    });
  })();
}

export { server };
