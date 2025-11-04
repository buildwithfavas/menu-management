require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

app.use(cors());
// app.use(cors({
//   origin: "frontend URL here",
//   credentials: true,
// }));
app.use(express.json());

const categoriesRouter = require("./routes/categoryRoutes");
const subcategoriesRouter = require("./routes/subCategoryRoutes");
const itemsRouter = require("./routes/itemRoutes");

// routes
app.use("/api/categories", categoriesRouter);
app.use("/api/subcategories", subcategoriesRouter);
app.use("/api/items", itemsRouter);

// basic root
app.get("/", (req, res) => res.send("🚀 Menu Management API is running"));

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "⚠️ Something went wrong" });
});

connectDB()
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error.message);
  });
