import Inventory from "./components/Inventory"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import AddProduct from "./components/AddProduct"
// import EditProduct from "./components/EditProduct"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import React, { createContext, useState } from 'react'

const FormDataContext = React.createContext();

export default function App() {

  const [highlight, setHighlight] = useState(false);

  const triggerHighlight = () => {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 3000); // Reset highlight state after 3 seconds
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
            <Route path="inventory" element={<Inventory highlight={highlight} />} />
            <Route path="tambah-produk" element={<AddProduct onAddProduct={triggerHighlight} />} />
            {/* <Route path="edit-produk" element={<EditProduct />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </FormDataContext.Provider>
  )
}

export { FormDataContext }
