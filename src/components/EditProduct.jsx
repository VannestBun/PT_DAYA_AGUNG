import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardCheck } from "lucide-react";
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export default function EditProduct({ item, reloadData, onDeleteToast, onSuccessToast, onFailToEditToast }) {

    const [editedItem, setEditedItem] = useState({ ...item })
    const [isUpdating, setIsUpdating] = useState(false)


    const handleChange = (e) => {
        setIsUpdating(true)
        const { id, value } = e.target;
        setEditedItem((prevItem) => ({
          ...prevItem,
          [id]: value,
        }));
        setIsUpdating(false)
      }


      const handleSaveChanges = async (e) => {
        e.preventDefault();
        
        const isChanged = JSON.stringify(editedItem) !== JSON.stringify(item);
      
        try {
          if (!isChanged) {
            return;
          }
      
          const response = await fetch('http://localhost:3000/item/edit', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: editedItem._id,
              updatedItem: editedItem,
            }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to save changes');
          }
      
          console.log('Changes saved:', editedItem);
          reloadData();
          onSuccessToast();
        } catch (error) {
          reloadData();
          onFailToEditToast();
          console.error('Error saving changes:', error.message);
        }
      };
      
        

      const handleDelete = async () => {
        try {
            const id = editedItem._id
    
            const response = await fetch('http://localhost:3000/item/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })  
            });
    
            if (!response.ok) {
                throw new Error(response.statusText); 
            }
    
            reloadData();
            onDeleteToast()
            console.log("Item deleted successfully, ID:", id);
    
        } catch (error) {
            console.error("Error during deletion:", error);
        }
    }

    const updateEditedItem = () => {
        setEditedItem({ ...item });
    }

      return (
        <Dialog>
        <div className="flex items-center justify-end gap-2">
          <DialogTrigger asChild>
            {/* <Button size="sm" className="mr-1" variant="outline" onClick={updateEditedItem}>Edit</Button> */}
            <Button size="sm" variant="outline" onClick={updateEditedItem} className="">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
            </Button>
          </DialogTrigger>
          <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
                className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                size="sm"
                variant="outline"
            >
                <TrashIcon className="w-4 h-4 mr-2" />
                Hapus
                </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Aksi ini tidak dapat dibatalkan. Ini akan menghapus barang secara permanen.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit barang</DialogTitle>
              <DialogDescription>
                Lakukan perubahan atau hapus barang ini.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveChanges}>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="kode" className="text-right">
                    Kode
                    </Label>
                    <Input id="kode" defaultValue={item.code} onChange={handleChange} className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="nama" className="text-right">
                    Nama
                    </Label>
                    <Input id="nama" defaultValue={item.name} onChange={handleChange} className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stok" className="text-right">
                    Stok
                    </Label>
                    <Input id="stok" defaultValue={item.stock} onChange={handleChange} className="col-span-3" type="number"  min="0" max="100000" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="satuan" className="text-right">
                    Satuan
                    </Label>
                    <Input id="satuan" list="defaultOption" defaultValue={item.unit} onChange={handleChange} className="col-span-3" required />
                    <datalist id="defaultOption">
                        <option value="PCS"></option>
                        <option value="BOX"></option>
                        <option value="SATUAN"></option>
                        <option value="KILO"></option>
                        <option value="GRAM"></option>
                    </datalist>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="jenis" className="text-right">
                    Jenis
                    </Label>
                    <Input id="jenis" defaultValue={item.type} onChange={handleChange} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gudang" className="text-right">
                    Gudang
                    </Label>
                    <Input id="gudang" defaultValue={item.warehouseDetails[0].warehouse} onChange={handleChange} className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="merek" className="text-right">
                    Merek
                    </Label>
                    <Input id="merek" defaultValue={item.brand} onChange={handleChange} className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="hargaJual" className="text-right">
                    Harga Jual (per barang)
                    </Label>
                    <Input id="hargaJual" defaultValue={item.price} onChange={handleChange} className="col-span-3" type="number" min="1000" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="keterangan" className="text-right">
                    Deskripsi
                    </Label>
                    <Input id="keterangan" defaultValue={item.description} onChange={handleChange} className="col-span-3"/>
                </div>
                </div>     
                <DialogFooter>
                <DialogClose asChild>
                    <Button type="submit" disabled={isUpdating || !editedItem.code || !editedItem.name}>Simpan perubahan</Button>
                </DialogClose>
                </DialogFooter>
            </form>    
          </DialogContent>
        </Dialog>
      );
    }


function DeleteIcon(props) {
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
        <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
        <line x1="18" x2="12" y1="9" y2="15" />
        <line x1="12" x2="18" y1="9" y2="15" />
      </svg>
    )
  }

  function TrashIcon(props) {
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
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    )
  }

  function PencilIcon(props) {
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
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    )
  }
  