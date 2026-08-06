import React, { useState } from 'react';

function App() {
  // 1. Mock Data (ጊዜያዊ መረጃ - Backend እስኪገናኝ)
  const [menu, setMenu] = useState([
    { id: 1, name: "Special Burger", price: 350 },
    { id: 2, name: "Club Sandwich", price: 280 }
  ]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // 2. Form Submit ሲደረግ በጊዜያዊነት መረጃ የሚጨምር (Local Test)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    
    const newItem = { id: Date.now(), name, price: Number(price) };
    setMenu([...menu, newItem]); // UI ላይ ብቻ ይጨምረዋል
    setName('');
    setPrice('');
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