 import { Button } from "@/components/ui/button"
 import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
 import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
 import { Link } from "react-router-dom"
 import { PencilIcon, TrashIcon, PlusIcon, Search } from "lucide-react"
 
 export default function Customers() {
   return (
     <div className="flex flex-col min-h-screen">
        <header className= "py-4 px-6">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">Customer Details</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                    </Button>
                    <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New Customer
                    </Button>
                </div>
            </div>
        </header>
       <main className="flex-1 py-8 px-6">
         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <Card>
             <CardHeader>
               <CardTitle className="mb-2">Customer Information</CardTitle>
               <div className="flex gap-2">
                 <Button variant="outline" size="icon">
                   <PencilIcon className="h-4 w-4" />
                   <span className="sr-only">Edit</span>
                 </Button>
                 <Button variant="destructive" size="icon">
                   <TrashIcon className="h-4 w-4" />
                   <span className="sr-only">Delete</span>
                 </Button>
               </div>
             </CardHeader>
             <CardContent className="space-y-2">
               <div>
                 <span className="font-medium">Name:</span> John Doe
               </div>
               <div>
                 <span className="font-medium">Email:</span>{" "}
                 <Link href="#" className="text-blue-500" prefetch={false}>
                   john@example.com
                 </Link>
               </div>
               <div>
                 <span className="font-medium">Phone:</span>{" "}
                 <Link href="#" className="text-blue-500" prefetch={false}>
                   +1 (234) 567-890
                 </Link>
               </div>
             </CardContent>
           </Card>
         </div>
       </main>
     </div>
   )
 }
 
 