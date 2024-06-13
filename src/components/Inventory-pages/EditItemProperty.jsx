import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { editItemProperty } from "../../ServiceLayer";

export default function EditItemProperty({ item, header, reloadData, onDeleteToast, onSuccessToast, onFailToEditToast }) {
  const [editedItem, setEditedItem] = useState(item); 

//   right now this only works for brand, it can already edit but no toaster, not automatic update, no refecthing


  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [id]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await editItemProperty('brand', editedItem._id, editedItem);
      editItemProperty(response);
      reloadData()
      onSuccessToast()
    } catch (error) {
      reloadData();
      onFailToEditToast();
      console.error('Failed to save changes:', error);
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
            {header.slice(0, -1).map((head, index) => (
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
              <Button type="submit">Simpan Perubahan</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
      <DialogTrigger asChild>
        <Button
          className="bg-red-100 text-red-800 hover:bg-red-200 ml-2"
          size="sm"
          variant="outline"
          onClick={() => onDelete(item)}
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Hapus
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}
