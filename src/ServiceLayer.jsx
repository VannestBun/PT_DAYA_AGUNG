// apiService.js

export const fetchItems = async () => {
    const response = await fetch('http://localhost:3000/item');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data;  
  };



  export async function fetchWarehouses() {
    const response = await fetch(`http://localhost:3000/warehouse`);
    if (!response.ok) {
      throw new Error('Failed to fetch warehouses');
    }
    const data = await response.json();
    return data.data;
  }
  
  export async function fetchUnits() {
    const response = await fetch(`http://localhost:3000/unit`);
    if (!response.ok) {
      throw new Error('Failed to fetch units');
    }
    const data = await response.json();
    return data.data;
  }
  
  export async function fetchTypes() {
    const response = await fetch(`http://localhost:3000/type`);
    if (!response.ok) {
      throw new Error('Failed to fetch types');
    }
    const data = await response.json();
    return data.data;
  }
  
  export async function fetchBrands() {
    const response = await fetch(`http://localhost:3000/brand`);
    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }
    const data = await response.json();
    return data.data;
  }


  
  export async function postProduct(product) {
    const response = await fetch(`http://localhost:3000/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add item');
    }
  
    const data = await response.json();
    return data;
  }

  export async function deleteItem(itemId) {
    const response = await fetch(`http://localhost:3000/item/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
  
    return true;
  }

  export async function editItem(itemId, updatedItem) {
    try {
      const response = await fetch(`http://localhost:3000/item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }


  export async function editItemProperty(itemProperty, itemPropertyId, updatedItemProperty) {
    try {
      const response = await fetch(`http://localhost:3000/${itemProperty}/${itemPropertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItemProperty),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }


  
