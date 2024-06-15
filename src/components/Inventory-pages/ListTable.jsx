


// // Make sure the addItemPropety works, and fix the design for the title make sure it looks identical

// import React, { useState } from 'react'
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table"
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { PlusIcon, SearchIcon, FilterIcon } from 'lucide-react'
// import EditItemProperty from './EditItemProperty'
// import { Toaster, toast } from 'sonner'
// import { useNavigate } from "react-router-dom";

// export default function ListTable({ data, headers, reloadData, onDeleteToast, onSuccessToast, onFailToEditToast }) {

//   const [searchQuery, setSearchQuery] = useState('')
//   const [stockFilter, setStockFilter] = useState('')
//   const navigate = useNavigate();

//   const handleAddItem = () => {
//     // Handle add item logic here, possibly open a modal for adding a new item
//      navigate("/tambah-produk-property");

//   }

//   const filteredData = data
//     .filter((item) =>
//       Object.entries(item).some(([key, value]) =>
//         key !== '_id' &&
//         typeof value === 'string' &&
//         value.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         value.length >= searchQuery.length
//       )
//     )
//     // .filter((item) => {
//     //   if (stockFilter === 'Habis') {
//     //     return item.stock === 0
//     //   } else if (stockFilter === 'Masih Ada') {
//     //     return item.stock > 0
//     //   } else {
//     //     return true
//     //   }
//     // })

//   return (
//     <>
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center">
//           <Input
//             className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
//             placeholder="Cari item..."
//             type="search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <SearchIcon className="absolute left-2.5 top-2.5 h-5 w-4 text-gray-500 dark:text-gray-400" />
//         </div>
//         <div className="flex items-center gap-4">
//           {/* <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button className="p-4 border rounded-md"><FilterIcon className="w-5 h-5 mr-2" />{stockFilter ? stockFilter : 'Filter Stok'}</Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem onClick={() => setStockFilter('Habis')}>Stok Habis</DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setStockFilter('Masih Ada')}>Stok Ada</DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setStockFilter('')}>Semua Stok</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu> */}
//           <Button variant="outline" onClick={handleAddItem}>
//             <PlusIcon className="w-5 h-5 mr-2" />
//             Tambah Item
//           </Button>
//         </div>
//       </div>

//       <div className="border shadow-sm rounded-lg">
//         <Table>
//           <TableHeader className="bg-gray-100">
//             <TableRow>
//               {headers.map((header) => (
//                 <TableHead key={header.key}>{header.displayName}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredData.slice().reverse().map((item, index) => (
//               <TableRow key={item._id} className="hover:bg-muted/50">
//                 {headers.filter(h => h.key !== 'actions').map(header => (
//                   <TableCell key={header.key}>{item[header.key]}</TableCell>
//                 ))}
//                 <TableCell>
//                   <EditItemProperty
//                     key={item._id}
//                     item={item}
//                     header={headers}
//                     reloadData={reloadData}
//                     onDeleteToast={onDeleteToast}
//                     onSuccessToast={onSuccessToast}
//                     onFailToEditToast={onFailToEditToast}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <Toaster richColors />
//     </>
//   )
// }




// ListTable.jsx 1st COPY
// import React, { useState } from 'react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
// import { PlusIcon, SearchIcon } from 'lucide-react';
// import EditItemProperty from './EditItemProperty';
// import { Toaster, toast } from 'sonner';
// import AddItemProperty from './AddItemProperty';
// import { useNavigate } from "react-router-dom";

// export default function ListTable({ data, headers, reloadData, onDeleteToast, onSuccessToast, onFailToEditToast, itemProperty }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const handleAddItem = () => {
//     // Handle add item logic here, possibly open a modal for adding a new item
//     navigate("/tambah-produk-property");
//   }

//   const filteredData = data.filter((item) =>
//     Object.entries(item).some(([key, value]) =>
//       key !== '_id' &&
//       typeof value === 'string' &&
//       value.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       value.length >= searchQuery.length
//     )
//   );

//   return (
//     <>
//       <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center">
//           <Input
//             className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
//             placeholder="Cari item..."
//             type="search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <SearchIcon className="absolute left-2.5 top-2.5 h-5 w-4 text-gray-500 dark:text-gray-400" />
//         </div>
//         <div className="flex items-center gap-4">
//           <Button variant="outline" onClick={handleAddItem}>
//             <PlusIcon className="w-5 h-5 mr-2" />
//             Tambah Item
//           </Button>
//           <AddItemProperty
//             property={itemProperty}
//             itemFields={headers.filter(header => header.key !== 'actions').map(header => ({
//               key: header.key,
//               label: header.displayName,
//               required: true, // Assuming all fields are required; adjust as needed
//             }))}
//           />
//         </div>
//       </div>

//       <div className="border shadow-sm rounded-lg">
//         <Table>
//           <TableHeader className="bg-gray-100">
//             <TableRow>
//               {headers.map((header) => (
//                 <TableHead key={header.key}>{header.displayName}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredData.slice().reverse().map((item) => (
//               <TableRow key={item._id} className="hover:bg-muted/50">
//                 {headers.filter(h => h.key !== 'actions').map(header => (
//                   <TableCell key={header.key}>{item[header.key]}</TableCell>
//                 ))}
//                 <TableCell>
//                   <EditItemProperty
//                     key={item._id}
//                     item={item}
//                     header={headers}
//                     reloadData={reloadData}
//                     onDeleteToast={onDeleteToast}
//                     onSuccessToast={onSuccessToast}
//                     onFailToEditToast={onFailToEditToast}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//       <Toaster richColors />
//     </>
//   );
// }

// 2nd COPY

// It works perfectly just need to make sure the addItem is in its own page using on off button
// also the naming convention can be better, and we can review for cleaner code

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { SearchIcon, PlusIcon } from 'lucide-react';
import EditItemProperty from './EditItemProperty';
import { Toaster } from 'sonner';
import AddItemProperty from './AddItemProperty';
import { useNavigate } from "react-router-dom";

export default function ListTable({ data, headers, reloadData, onDeleteToast, onSuccessToast, onFailToEditToast, itemProperty }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleAddItem = () => {
    navigate("/tambah-produk-property");
  }

  const filteredData = data.filter((item) =>
    Object.entries(item).some(([key, value]) =>
      key !== '_id' &&
      typeof value === 'string' &&
      value.toLowerCase().includes(searchQuery.toLowerCase()) &&
      value.length >= searchQuery.length
    )
  );

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className='relative'>
            <SearchIcon className="absolute left-2.5 top-2.5 h-5 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Cari item..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleAddItem}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Tambah Item
          </Button>
          <AddItemProperty
            property={itemProperty}
            itemFields={headers.filter(header => header.key !== 'actions').map(header => ({
              key: header.key,
              label: header.displayName,
              required: true, // Assuming all fields are required; adjust as needed
            }))}
            onAddProperty={reloadData}
          />
        </div>
      </div>

      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header.key}>{header.displayName}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.slice().reverse().map((item) => (
              <TableRow key={item._id} className="hover:bg-muted/50">
                {headers.filter(h => h.key !== 'actions').map(header => (
                  <TableCell key={header.key}>{item[header.key]}</TableCell>
                ))}
                <TableCell>
                  <EditItemProperty
                    key={item._id}
                    item={item}
                    header={headers}
                    reloadData={reloadData}
                    onDeleteToast={onDeleteToast}
                    onSuccessToast={onSuccessToast}
                    onFailToEditToast={onFailToEditToast}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Toaster richColors />
    </>
  );
}
