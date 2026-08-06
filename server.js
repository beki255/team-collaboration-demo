const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const menuItems = [
  { id: 1, name: "Special Burger", price: 350 },
  { id: 2, name: "Club Sandwich", price: 280 },
  { id: 3, name: "Macchiato", price: 45 }
];

app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});