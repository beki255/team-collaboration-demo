const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// 1. ከ MongoDB ጋር ማገናኘት (Local database Name: cafedb)
mongoose.connect('mongodb://localhost:27017/cafedb')
  .then(() => console.log('MongoDB በስኬት ተገናኝቷል!'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// 2. Schema እና Model መቅረጽ (Database Table Structure)
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// 3. GET API (ከ MongoDB አምጥቶ ማሳየት)
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. POST API (ወደ MongoDB ፅፎ ማስቀመጥ)
app.post('/api/menu', async (req, res) => {
  try {
    const newItem = new MenuItem({
      name: req.body.name,
      price: req.body.price
    });
    const savedItem = await newItem.save();
    res.status(201).json({ message: "ምግቡ በቋሚነት ተመዝግቧል!", data: savedItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 5. DELETE API (ምግብ ከ MongoDB ለማጥፋት)
app.delete('/api/menu/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "ምግቡ አልተገኘም!" });
    }
    res.json({ message: "ምግቡ በስኬት ተሰርዟል!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});