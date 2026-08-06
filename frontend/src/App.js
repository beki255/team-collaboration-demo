import React, { useEffect, useState } from 'react';

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error("Error fetching menu:", err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Café Menu</h1>
      <ul>
        {menu.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.price} ETB
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;