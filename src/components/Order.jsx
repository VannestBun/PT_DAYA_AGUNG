 import { Button } from "@/components/ui/button"
 import { Card, CardContent } from "@/components/ui/card"
 import { Badge } from "@/components/ui/badge"
 import { PencilIcon, TrashIcon, PlusIcon, Search } from "lucide-react"
 
 export default function Component() {
   return (
     <div className="grid gap-6 md:gap-8 px-4 md:px-6 py-6 md:py-8">
       <div>
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-2xl font-bold">Paid Orders</h2>
           <div className="flex gap-2">
             <Button variant="outline" size="sm">
               <PencilIcon className="w-4 h-4" />
               <span className="sr-only">Edit</span>
             </Button>
             <Button variant="outline" size="sm">
               <TrashIcon className="w-4 h-4" />
               <span className="sr-only">Delete</span>
             </Button>
           </div>
         </div>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
           <Card className="pt-5">
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Sophia Anderson</div>
                 <Badge variant="success" className="bg-green-500 text-white">
                   Paid
                 </Badge>
               </div>
               <div>Glimmer Lamps</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 2</div>
                 <div className="font-medium">$120.00</div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Ava Johnson</div>
                 <Badge variant="success" className="bg-green-500 text-white">
                   Paid
                 </Badge>
               </div>
               <div>Aqua Filters</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 3</div>
                 <div className="font-medium">$49.00</div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Samantha Green</div>
                 <Badge variant="success" className="bg-green-500 text-white">
                   Paid
                 </Badge>
               </div>
               <div>Vintage Pocket Watch</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 1</div>
                 <div className="font-medium">$79.99</div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Sophia Anderson</div>
                 <Badge variant="success" className="bg-green-500 text-white">
                   Paid
                 </Badge>
               </div>
               <div>Wireless Earbuds</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 1</div>
                 <div className="font-medium">$69.99</div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Sophia Anderson</div>
                 <Badge variant="success" className="bg-green-500 text-white">
                   Paid
                 </Badge>
               </div>
               <div>Wireless Earbuds</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 1</div>
                 <div className="font-medium">$69.99</div>
               </div>
             </CardContent>
           </Card>
         </div>
       </div>
       <div>
         <div className="flex items-center justify-between mb-4">
           <h2 className="text-2xl font-bold">Unpaid Orders</h2>
           <div className="flex gap-2">
             <Button variant="outline" size="sm">
               <PencilIcon className="w-4 h-4" />
               <span className="sr-only">Edit</span>
             </Button>
             <Button variant="outline" size="sm">
               <TrashIcon className="w-4 h-4" />
               <span className="sr-only">Delete</span>
             </Button>
           </div>
         </div>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
           <Card className="pt-5">
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Michael Johnson</div>
                 <Badge variant="danger" className="bg-red-500 text-white">
                   Unpaid
                 </Badge>
               </div>
               <div>Classic Leather Shoes</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 1</div>
                 <div className="font-medium">$64.75</div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Lisa Anderson</div>
                 <Badge variant="danger" className="bg-red-500 text-white">
                   Unpaid
                 </Badge>
               </div>
               <div>Designer Handbag</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 1</div>
                 <div className="font-medium">$34.50</div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Adam Barlow</div>
                 <Badge variant="danger" className="bg-red-500 text-white">
                   Unpaid
                 </Badge>
               </div>
               <div>Cool Breeze Portable Fan</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 1</div>
                 <div className="font-medium">$24.99</div>
               </div>
             </CardContent>
           </Card>
           <Card>
             <CardContent className="grid gap-2">
               <div className="flex items-center justify-between">
                 <div className="font-medium">Sophia Anderson</div>
                 <Badge variant="danger" className="bg-red-500 text-white">
                   Unpaid
                 </Badge>
               </div>
               <div>Sunset Shades Sunglasses</div>
               <div className="flex items-center justify-between">
                 <div>Quantity: 1</div>
                 <div className="font-medium">$29.99</div>
               </div>
             </CardContent>
           </Card>
         </div>
       </div>
     </div>
   )
 }
 
 