const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite Database
const db = new sqlite3.Database("./barmani.db", (err) => {
  if (err) console.error("Error opening database:", err);
  else console.log("Connected to SQLite database.");
});

// Create Tables (if not exist)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS budget (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      income REAL,
      expenses REAL,
      tax_rate REAL
    )
  `);
});

// Routes
app.get("/", (req, res) => {
  res.send("Barmani Backend Running! 🚀");
});

// Add Budget Entry
app.post("/budget", (req, res) => {
  const { date, income, expenses, tax_rate } = req.body;
  db.run(
    `INSERT INTO budget (date, income, expenses, tax_rate) VALUES (?, ?, ?, ?)`,
    [date, income, expenses, tax_rate],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, date, income, expenses, tax_rate });
    }
  );
});

// Get All Budget Entries
app.get("/budget", (req, res) => {
  db.all("SELECT * FROM budget", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
