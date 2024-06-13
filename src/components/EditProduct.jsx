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
import { PencilIcon, TrashIcon } from "lucide-react"; // Import icons
import { useState } from "react";
import { deleteItem, editItem } from "../ServiceLayer";
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
} from "@/components/ui/alert-dialog";

export default function EditProduct({ item, reloadData, onDeleteToast, onSuccessToast, onFailToEditToast }) {

  const [editedItem, setEditedItem] = useState({ ...item });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const isChanged = JSON.stringify(editedItem) !== JSON.stringify(item);

    try {
      if (!isChanged) {
        return;
      }

      const updatedItem = {
        code: editedItem.code,
        name: editedItem.name,
        stock: editedItem.stock,
        unit: editedItem.unit,
        type: editedItem.type,
        price: editedItem.price,
        description: editedItem.description,
        warehouseId: editedItem.warehouseDetails[0]._id,
        brand: editedItem.brand,
      };
      const response = await editItem(editedItem._id, updatedItem);

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
      const id = editedItem._id;
      const response = await deleteItem(id);
      if (response) {
        reloadData();
        onDeleteToast();
        console.log("Item deleted successfully, ID:", id);
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const updateEditedItem = () => {
    setEditedItem({ ...item });
  };

  return (
    <Dialog>
      <div className="flex items-center justify-end gap-2">
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" onClick={updateEditedItem}>
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
              <Label htmlFor="code" className="text-right">
                Kode
              </Label>
              <Input id="code" defaultValue={item.code} onChange={handleChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama
              </Label>
              <Input id="name" defaultValue={item.name} onChange={handleChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stok
              </Label>
              <Input id="stock" defaultValue={item.stock} onChange={handleChange} className="col-span-3" type="number" min="0" max="100000" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Satuan
              </Label>
              <Input id="unit" list="defaultOption" defaultValue={item.unit} onChange={handleChange} className="col-span-3" required />
              <datalist id="defaultOption">
                <option value="PCS"></option>
                <option value="BOX"></option>
                <option value="SATUAN"></option>
                <option value="KILO"></option>
                <option value="GRAM"></option>
              </datalist>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Jenis
              </Label>
              <Input id="type" defaultValue={item.type} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="warehouse" className="text-right">
                Gudang
              </Label>
              <Input id="warehouse" defaultValue={item.warehouseDetails[0].warehouse} onChange={handleChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Merek
              </Label>
              <Input id="brand" defaultValue={item.brand} onChange={handleChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Harga Jual (per barang)
              </Label>
              <Input id="price" defaultValue={item.price} onChange={handleChange} className="col-span-3" type="number" min="1000" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Deskripsi
              </Label>
              <Input id="description" defaultValue={item.description} onChange={handleChange} className="col-span-3"/>
            </div>
          </div>     
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={!editedItem.code || !editedItem.name}>Simpan perubahan</Button>
            </DialogClose>
          </DialogFooter>
        </form>    
      </DialogContent>
    </Dialog>
  );
}
  