import React, { useState, useEffect } from 'react';

function App() {
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // 1. Backend API በመጥራት የምግቦችን ዝርዝር መቀበል (GET)
  const fetchMenu = () => {
    fetch('http://localhost:5000/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error("Error fetching menu:", err));
  };

  useEffect(() => {
    fetchMenu(); // ገጹ ሲከፈት መረጃውን ከ Backend ያመጣል
  }, []);

  // 2. አዲስ ምግብ ወደ Backend መላክ (POST)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    fetch('http://localhost:5000/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price: Number(price) })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Success:", data);
        fetchMenu(); // በ Backend ከተቀመጠ በኋላ ዝርዝሩን በድጋሚ ያድሳል
        setName('');
        setPrice('');
      })
      .catch(err => console.error("Error adding item:", err));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>☕ Café Menu Management</h1>
      
      {/* አዲስ ምግብ መጨመሪያ Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Food Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 2, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="number" 
          placeholder="Price (ETB)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add
        </button>
      </form>

      {/* የምግቦች ዝርዝር Card */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menu.map(item => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #eee' }}>
            <span style={{ fontWeight: 'bold' }}>{item.name}</span>
            <span style={{ color: '#28a745' }}>{item.price} ETB</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;