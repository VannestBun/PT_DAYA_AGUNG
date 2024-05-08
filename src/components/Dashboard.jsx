import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Button } from "@/components/ui/button";
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

export default function Dashboard() {

//   async function testEditItem() {
//     const existingItem = {
//         "_id": "6634ee45a4d780364e7f266a",
//         "kode": "4",
//         "nama": "Miso",
//         "stok": 100,
//         "satuan": "SATUAN",
//         "jenis": "Batu bara",
//         "hargaJual": 87000,
//         "keterangan": "4",
//         "gudang": "Thamrin",
//         "merek": "Opello",
//         "__v": 0
//         };
//     console.log(existingItem.kode)

//     try {
//       const response = await fetch('http://localhost:3000/item/edit', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: existingItem._id, updatedItem: existingItem }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.text();
//         console.error('Failed to edit item:', errorMessage);
//         // Handle error message
//       } else {
//         const successMessage = await response.json();
//         console.log('Item edited successfully:', successMessage);
//         // Handle success message
//       }
//     } catch (error) {
//       console.error('Error editing item:', error.message);
//       // Handle error
//     }
//   }

//   function button1() {
//     testEditItem();
//   }

//   function button2() {
//     console.log('button2 was clicked')
//   }

  return (
    <>
      {/* <Button onClick={() => toast.success('My first toast')}>
        Give me a toast
      </Button>
      <Toaster richColors /> */}
      <h1 className='hover:bg-muted/50'>Dashboard here</h1>
      {/* <button onClick={button1}>Test Edit Item</button> */}
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
