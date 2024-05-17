import React from 'react';

export default function Warehouse() {
  const handleFetch = () => {
    fetch('http://localhost:3000/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: "2120",
        name: "HetoshiNewOne##$",
        stock: 200,
        unit: "PCS",
        type: "Wheelchair",
        price: 20000,
        description: "This is a description",
        warehouseId: "66430a2ff1190174fc1b38d5",
        brand: "SELLA"
      })
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Gudang</h1>
      <button onClick={handleFetch}>Add Item</button>
    </div>
  );
}
