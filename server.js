const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // JSON መረጃ መቀበል እንዲችል

let menuItems = [
  { id: 1, name: "Special Burger", price: 350 },
  { id: 2, name: "Club Sandwich", price: 280 },
  { id: 3, name: "Macchiato", price: 45 }
];

// 1. GET API (ያሉትን ምግቦች ለማየት)
app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// 2. POST API (አዲስ ምግብ ለመጨመር)
app.post('/api/menu', (req, res) => {
  const newItem = {
    id: menuItems.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  menuItems.push(newItem);
  res.status(201).json({ message: "ምግቡ ተጨምሯል!", data: newItem });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});