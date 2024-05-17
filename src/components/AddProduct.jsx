import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from 'sonner'
import { useContext, useState, useEffect } from "react"
import { FormDataContext } from "../App"


export default function AddProduct({onAddProduct}) {

  const {formData, setFormData} = useContext(FormDataContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [warehouses, setWarehouses] = useState([])
  const [unit, setUnit] = useState([])
  const [type, setType] = useState([])
  const [brand, setBrand] = useState([])

  const navigate = useNavigate()

    useEffect(() => {
      fetch('http://localhost:3000/warehouse')
        .then(response => response.json())
        .then(data => {
          setWarehouses(data.data);
          console.log('Success:', data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch('http://localhost:3000/unit')
        .then(response => response.json())
        .then(data => {
          setUnit(data.data);
          console.log('Success:', data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch('http://localhost:3000/type')
        .then(response => response.json())
        .then(data => {
          setType(data.data);
          console.log('Success:', data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
      fetch('http://localhost:3000/brand')
        .then(response => response.json())
        .then(data => {
          setBrand(data.data);
          console.log('Success:', data);
        })
        .catch(error => console.error('Error:', error));
    }, []);


  // console.log(formData)

  async function postData() {
    try {
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
  
      const response = await fetch('http://localhost:3000/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappedData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
  
      const data = await response.json();
      console.log('Item added successfully:', data);

      return data;
  
    } catch (error) {
      throw error;
      console.error('Error adding item:', error.message);
    }
  }

  function handleChange(event) {
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [event.target.name]: event.target.value
        }
      })
    }

    function navigateToInventory() {
      navigate('/inventory');
    }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return

    setIsSubmitting(true)
  
    try {
      const successFetch = await postData(formData)
      toast.success('Barang berhasil ditambahkan');
  
      setTimeout(() => {
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
  
        navigate('/inventory');
        onAddProduct()
        setIsSubmitting(false)
      }, 1000);
    } catch (error) {
      toast.error('Gagal menambahkan barang, kode atau nama barang sudah ada');
      console.error('Failed to add item', error.message);
      setIsSubmitting(false)
    }
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
            <Input name="satuanProduk" placeholder="Masukkan satuan barang" list="defaultOption" onChange={handleChange} value={formData.satuanProduk} required/>
            <datalist id="defaultOption">
              <option value="PCS"></option>
              <option value="BOX"></option>
              <option value="SATUAN"></option>
              <option value="KILO"></option>
              <option value="GRAM"></option>
            </datalist>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jenisProduk">Jenis Barang</Label>
            <Input name="jenisProduk" placeholder="Masukkan jenis barang" onChange={handleChange} value={formData.jenisProduk} required/>
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
            <Input name="merekProduk" placeholder="Masukkan merek barang" onChange={handleChange} value={formData.merekProduk} required/>
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
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Kembali
            </Button>
            <Button className="flex-1">
              <PlusIcon className="h-5 w-5 mr-2" />
              Tambah Produk
            </Button>
          </div>
          <Toaster richColors />
        </form>
      </CardContent>
    </Card>
    
  )
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