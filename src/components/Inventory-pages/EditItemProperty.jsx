import React, { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { editItemProperty, deleteItemProperty } from "../../ServiceLayer"
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

export default function EditItemProperty({ item, header, reloadData, onDeleteToast, onSuccessToast, onFailToEditToast }) {
  const [editedItem, setEditedItem] = useState({ ...item });

  const propertyKey = header.find(h => h.key !== 'actions').key;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    const isChanged = JSON.stringify(editedItem) !== JSON.stringify(item);
    e.preventDefault();
    try {
    if (!isChanged) {
        return;
        }
      const response = await editItemProperty(propertyKey, editedItem._id, editedItem);
      if (response) {
        reloadData();
        onSuccessToast();
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (error) {
      reloadData();
      onFailToEditToast();
      console.error('Failed to save changes:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteItemProperty(propertyKey, item._id);
      if (response) {
        reloadData();
        onDeleteToast();
        console.log(`Item deleted successfully for ${propertyKey}, ID:`, item._id);
      } else {
        throw new Error(`Failed to delete ${propertyKey}`);
      }
    } catch (error) {
      console.error(`Error during deletion of ${propertyKey}:`, error);
    }
  };

  const updateEditedItem = () => {
    setEditedItem({ ...item });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" onClick={updateEditedItem}>
          <PencilIcon className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Barang</DialogTitle>
          <DialogDescription>Lakukan perubahan atau hapus barang ini.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSaveChanges}>
          <div className="grid gap-4 py-4">
            {header.filter(h => h.key !== 'actions').map((head, index) => (
              <div key={index} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={head.key} className="text-right">{head.displayName}</Label>
                <Input
                  id={head.key}
                  defaultValue={editedItem[head.key]}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button 
                type="submit" 
                disabled={!header.filter(h => h.key !== 'actions').every(h => editedItem[h.key])}
              >
                Simpan Perubahan
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="bg-red-100 text-red-800 hover:bg-red-200 ml-2"
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
              Aksi ini tidak dapat dibatalkan. Ini akan menghapus MEREK(tapi ini seharusnya bisa lebih reusable) secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
