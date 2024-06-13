import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchWarehouses, fetchUnits, fetchTypes, fetchBrands, postProduct } from '../ServiceLayer';

export default function AddProduct({ onAddProduct, formData, setFormData }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: warehouses = [] } = useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchWarehouses,
  });

  const { data: units = [] } = useQuery({
    queryKey: ['units'],
    queryFn: fetchUnits,
  });

  const { data: types = [] } = useQuery({
    queryKey: ['types'],
    queryFn: fetchTypes,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  const mutation = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
      toast.success('Barang berhasil ditambahkan')
      setFormData({
        kodeProduk: '',
        namaProduk: '',
        hargaJual: '',
        stok: '',
        satuanProduk: '',
        jenisProduk: '',
        gudangProduk: '',
        merekProduk: '',
        deskripsiProduk: ''
      });
      setTimeout(() => {
        navigate('/inventory');
      }, 1000); // Navigate after 1 second
      onAddProduct()
    },
    onError: (error) => {
      toast.error('Gagal menambahkan barang, kode atau nama barang sudah ada')
      console.error('Failed to add item', error.message)
    },
    onSettled: () => {
      setIsSubmitting(false)
    }
  });
  
  function handleChange(event) {
    console.log(formData)
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true);
    const mappedData = {
      code: formData.kodeProduk,
      name: formData.namaProduk,
      stock: parseInt(formData.stok),
      unit: formData.satuanProduk,
      type: formData.jenisProduk,
      price: parseFloat(formData.hargaJual),
      description: formData.deskripsiProduk,
      warehouseId: formData.gudangProduk,
      brand: formData.merekProduk
    };
    mutation.mutate(mappedData)
  }

  function navigateToInventory() {
    navigate('/inventory')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Barang Baru</CardTitle>
        <CardDescription>Isi formulir untuk menambahkan barang baru ke inventory Anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="kodeProduk">Kode Barang</Label>
            <Input name="kodeProduk" placeholder="Masukkan kode barang" onChange={handleChange} value={formData.kodeProduk} required/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="namaProduk">Nama Barang</Label>
            <Input name="namaProduk" placeholder="Masukkan nama barang" onChange={handleChange} value={formData.namaProduk} required/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stok">Stok</Label>
            <Input name="stok" placeholder="Masukan stok" type="number" min="0" max="100000" onChange={handleChange} value={formData.stok} required/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="satuanProduk">Satuan Barang</Label>
            <select 
              className="border p-2 rounded-md text-slate-500 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              name="satuanProduk"
              onChange={handleChange}
              value={formData.satuanProduk}
              required
            >
              <option value="">--Pilih satuan barang--</option>
              {units.map(unit => (
                <option key={unit._id} value={unit.unit}>
                  {unit.unit}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jenisProduk">Jenis Barang</Label>
            <select 
              className="border p-2 rounded-md text-slate-500 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              name="jenisProduk"
              onChange={handleChange}
              value={formData.jenisProduk}
              required
            >
              <option value="">--Pilih jenis barang--</option>
              {types.map(type => (
                <option key={type._id} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gudangProduk">Gudang Barang</Label>
            <select 
              className="border p-2 rounded-md text-slate-500 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              name="gudangProduk" 
              onChange={handleChange} 
              value={formData.gudangProduk} 
              required
            >
              <option value="">--Pilih gudang barang--</option>
              {warehouses.map(warehouse => (
                <option key={warehouse._id} value={warehouse._id}>
                  {warehouse.warehouse}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="merekProduk">Merek Barang</Label>
            <select 
              className="border p-2 rounded-md text-slate-500 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              name="merekProduk"
              onChange={handleChange}
              value={formData.merekProduk}
              required
            >
              <option value="">--Pilih merek barang--</option>
              {brands.map(brand => (
                <option key={brand._id} value={brand.brand}>
                  {brand.brand}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hargaJual">Harga Jual (per barang)</Label>
            <Input name="hargaJual" placeholder="Masukan harga jual per barang" type="number" min="1000" onChange={handleChange} value={formData.hargaJual} required/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deskripsiProduk">Deskripsi</Label>
            <Textarea name="deskripsiProduk" placeholder="Masukkan deskripsi barang" onChange={handleChange} value={formData.deskripsiProduk}/>
          </div>
          <div className="flex gap-4">
            <Button className="flex-1 bg-gray-900/10" variant="outline" type="button" onClick={navigateToInventory}>
              Kembali
            </Button>
            <Button className="flex-1">
              Tambah Produk
            </Button>
          </div>
          <Toaster richColors />
        </form>
      </CardContent>
    </Card>
  );
}


function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}