const express = require("express");
const cors = require("cors");

const app = express(); // ✅ REQUIRED

app.use(cors());

const inventory = require("./data/inventory.json");

// 🔍 Search API
app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let filtered = [...inventory];

  // Trim inputs
  if (q) q = q.trim();
  if (category) category = category.trim();

  // Validate numbers
  if (minPrice && isNaN(minPrice)) {
    return res.status(400).json({ message: "Invalid minPrice" });
  }

  if (maxPrice && isNaN(maxPrice)) {
    return res.status(400).json({ message: "Invalid maxPrice" });
  }

  // Invalid range
 if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
  return res.status(400).json({
    message: "Minimum price cannot be greater than maximum price"
  });
}

  // Name filter
  if (q) {
    filtered = filtered.filter(item =>
      item.productName.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Category filter
  if (category && category !== "") {
    filtered = filtered.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Price filters
  if (minPrice) {
    filtered = filtered.filter(item => item.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(item => item.price <= Number(maxPrice));
  }

  res.json(filtered);
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});