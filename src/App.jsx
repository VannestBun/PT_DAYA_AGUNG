import Inventory from "./components/Inventory"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import AddProduct from "./components/AddProduct"
import Order from "./components/Order"
import Customers from "./components/Customers"
import InventoryLayout from "./layout/inventory-layout"
import Satuan from "./components/Inventory-pages/Unit"
import Merek from "./components/Inventory-pages/Brand"
import Jenis from "./components/Inventory-pages/Type"
import Gudang from "./components/Inventory-pages/Warehouse"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import React, { createContext, useState } from 'react'

const FormDataContext = React.createContext();

export default function App() {

  const [highlight, setHighlight] = useState(false);

  const triggerHighlight = () => {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 3000);
  };

  const [formData, setFormData] = useState({
    kodeProduk: '',
    namaProduk: '',
    hargaJual: 0,
    stok: 0,
    satuanProduk: '',
    jenisProduk: '',
    gudangProduk: '',
    merekProduk: '',
    deskripsiProduk: ''
  });
   
  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Dashboard />} />
            <Route path="tambah-produk" element={<AddProduct onAddProduct={triggerHighlight} />} />
            <Route path="pesanan" element={<Order />} />
            <Route path="pelanggan" element={<Customers  />}/>

            <Route path="inventory" element={<InventoryLayout />}>
              <Route index element={<Inventory highlight={highlight} />} />
              <Route path="satuan" element={<Satuan />} />
              <Route path="jenis" element={<Jenis />} />
              <Route path="merek" element={<Merek />} />
              <Route path="gudang" element={<Gudang />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </FormDataContext.Provider>
  )
}

export { FormDataContext }
