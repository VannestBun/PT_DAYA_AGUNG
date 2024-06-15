// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";

// async function addItemProperty(property, newItem) {

// // This is sample add item to help BUT it can be the reel deal

//   try {
//     const response = await fetch(`http://localhost:3000/${property}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newItem),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to add item');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error adding item:', error);
//     return null;
//   }
// }

// export default function AddItemProperty() {
//   const [newItem, setNewItem] = useState({ brand: 'SELLA', description: 'This is description' });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setNewItem((prevItem) => ({
//       ...prevItem,
//       [id]: value,
//     }));
//   };

//   const handleAddItem = async (e) => {
//     e.preventDefault();
//     const response = await addItemProperty('brand', newItem);
//     if (response) {
//       alert('Brand added successfully');
//       setNewItem({ brand: '', description: '' }); // Reset form
//     } else {
//       alert('Failed to add brand');
//     }
//   };

//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button size="sm" variant="outline">
//             Add Brand
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add Brand</DialogTitle>
//             <DialogDescription>Fill out the form to add a new brand.</DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleAddItem}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="brand" className="text-right">Brand</Label>
//                 <Input
//                   id="brand"
//                   value={newItem.brand}
//                   onChange={handleChange}
//                   className="col-span-3"
//                   required
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="description" className="text-right">Description</Label>
//                 <Input
//                   id="description"
//                   value={newItem.description}
//                   onChange={handleChange}
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <DialogClose asChild>
//                 <Button type="submit">Add Brand</Button>
//               </DialogClose>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner';
import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { addItemProperty } from "../../ServiceLayer"


export default function AddItemProperty({ itemFields = [], onAddProperty }) {
  const [formData, setFormData] = useState(
    itemFields.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {})
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const property = itemFields[0]?.key || '';

  const mutation = useMutation({
    mutationFn: (newItem) => addItemProperty(property, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries([property]);
      toast.success(`${property} berhasil ditambahkan`);
      setFormData(
        itemFields.reduce((acc, field) => {
          acc[field.key] = '';
          return acc;
        }, {})
      );
      setTimeout(() => {
        navigate('/inventory');
      }, 1000); // Navigate after 1 second
      if (onAddProperty) onAddProperty();
    },
    onError: (error) => {
      toast.error(`Gagal menambahkan ${property}`);
      console.error('Failed to add item', error.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    mutation.mutate(formData);
  };

  const navigateToInventory = () => {
    navigate('/inventory');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah {property}</CardTitle>
        <CardDescription>Isi formulir untuk menambahkan {property} baru.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {itemFields.map((field) => (
            <div key={field.key} className="grid gap-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              <Input
                name={field.key}
                placeholder={field.label}
                onChange={handleChange}
                value={formData[field.key]}
                required={field.required}
              />
            </div>
          ))}
          <div className="flex gap-4">
            <Button className="flex-1 bg-gray-900/10" variant="outline" type="button" onClick={navigateToInventory}>
              Kembali
            </Button>
            <Button className="flex-1" type="submit">
              Tambah {property}
            </Button>
          </div>
          <Toaster richColors />
        </form>
      </CardContent>
    </Card>
  );
}
