const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Arun@123',
  database: 'app_dashboard'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL database.');
});

// ✅ Optional root route for test
app.get('/', (req, res) => {
  res.send('Welcome to the App Dashboard API!');
});

// ✅ This is the route you need
app.get('/api/apps', (req, res) => {
  db.query('SELECT * FROM app_configs', (err, results) => {
    if (err) {
      console.error('Error fetching apps:', err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
