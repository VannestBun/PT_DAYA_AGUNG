 import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card"
 import { ResponsiveLine } from "@nivo/line"
 import { ResponsiveBar } from "@nivo/bar"
 import { Link } from "react-router-dom"
 import React from 'react';
 
 export default function Dashboard() {

   return (
     <main className="flex-1 grid grid-cols-1">
       <div className="p-6 md:p-8">
         <div className="grid gap-6 md:gap-8">
           <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
             <Card className="bg-blue-100 dark:bg-blue-900">
               <CardHeader className="flex items-center justify-between pb-2">
                 <CardTitle className="text-sm font-medium">Total Barang</CardTitle>
                 <PackageIcon className="h-5 w-5 text-blue-500 dark:text-blue-300" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">12,345</div>
                 <p className="text-xs text-blue-500 dark:text-blue-400">+5.2% from last month</p>
               </CardContent>
             </Card>
             <Card className="bg-green-100 dark:bg-green-900">
               <CardHeader className="flex items-center justify-between pb-2">
                 <CardTitle className="text-sm font-medium">Stock Ada</CardTitle>
                 <CircleCheckIcon className="h-5 w-5 text-green-500 dark:text-green-300" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold text-green-700 dark:text-green-300">9,876</div>
                 <p className="text-xs text-green-500 dark:text-green-400">+3.1% from last month</p>
               </CardContent>
             </Card>
             <Card className="bg-orange-100 dark:bg-orange-900">
               <CardHeader className="flex items-center justify-between pb-2">
                 <CardTitle className="text-sm font-medium">Dalam Pesanan</CardTitle>
                 <TruckIcon className="h-5 w-5 text-orange-500 dark:text-orange-300" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">2,345</div>
                 <p className="text-xs text-orange-500 dark:text-orange-400">+12.4% from last month</p>
               </CardContent>
             </Card>
             <Card className="bg-red-100 dark:bg-red-900">
               <CardHeader className="flex items-center justify-between pb-2">
                 <CardTitle className="text-sm font-medium">Stok Habis</CardTitle>
                 <TriangleAlertIcon className="h-5 w-5 text-red-500 dark:text-red-300" />
               </CardHeader>
               <CardContent>
                 <div className="text-2xl font-bold text-red-700 dark:text-red-300">456</div>
                 <p className="text-xs text-red-500 dark:text-red-400">-1.2% from last month</p>
               </CardContent>
             </Card>
           </div>
           <div className="grid gap-6 md:grid-cols-2">
             <Card className="bg-purple-100 dark:bg-purple-900">
               <CardHeader>
                 <CardTitle>Inventory Trends</CardTitle>
                 <CardDescription>A line chart showing inventory levels over time.</CardDescription>
               </CardHeader>
               <CardContent>
                 <LineChart className="aspect-[9/4]" />
               </CardContent>
             </Card>
             <Card className="bg-teal-100 dark:bg-teal-900">
               <CardHeader>
                 <CardTitle>Top Selling Items</CardTitle>
                 <CardDescription>A bar chart showing the top selling items.</CardDescription>
               </CardHeader>
               <CardContent>
                 <BarChart className="aspect-[9/4]" />
               </CardContent>
             </Card>
           </div>
         </div>
       </div>
     </main>
   )
 }
 
 function BarChart(props) {
   return (
     <div {...props}>
       <ResponsiveBar
         data={[
           { name: "Jan", count: 111 },
           { name: "Feb", count: 157 },
           { name: "Mar", count: 129 },
           { name: "Apr", count: 150 },
           { name: "May", count: 119 },
           { name: "Jun", count: 72 },
         ]}
         keys={["count"]}
         indexBy="name"
         margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
         padding={0.3}
         colors={["#2563eb"]}
         axisBottom={{
           tickSize: 0,
           tickPadding: 16,
         }}
         axisLeft={{
           tickSize: 0,
           tickValues: 4,
           tickPadding: 16,
         }}
         gridYValues={4}
         theme={{
           tooltip: {
             chip: {
               borderRadius: "9999px",
             },
             container: {
               fontSize: "12px",
               textTransform: "capitalize",
               borderRadius: "6px",
             },
           },
           grid: {
             line: {
               stroke: "#f3f4f6",
             },
           },
         }}
         tooltipLabel={({ id }) => `${id}`}
         enableLabel={false}
         role="application"
         ariaLabel="A bar chart showing data"
       />
     </div>
   )
 }
 
 
 function CircleAlertIcon(props) {
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
       <circle cx="12" cy="12" r="10" />
       <line x1="12" x2="12" y1="8" y2="12" />
       <line x1="12" x2="12.01" y1="16" y2="16" />
     </svg>
   )
 }
 
 
 function CircleCheckIcon(props) {
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
       <circle cx="12" cy="12" r="10" />
       <path d="m9 12 2 2 4-4" />
     </svg>
   )
 }
 
 
 function FileTextIcon(props) {
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
       <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
       <path d="M14 2v4a2 2 0 0 0 2 2h4" />
       <path d="M10 9H8" />
       <path d="M16 13H8" />
       <path d="M16 17H8" />
     </svg>
   )
 }
 
 
 function LineChart(props) {
   return (
     <div {...props}>
       <ResponsiveLine
         data={[
           {
             id: "Desktop",
             data: [
               { x: "Jan", y: 43 },
               { x: "Feb", y: 137 },
               { x: "Mar", y: 61 },
               { x: "Apr", y: 145 },
               { x: "May", y: 26 },
               { x: "Jun", y: 154 },
             ],
           },
           {
             id: "Mobile",
             data: [
               { x: "Jan", y: 60 },
               { x: "Feb", y: 48 },
               { x: "Mar", y: 177 },
               { x: "Apr", y: 78 },
               { x: "May", y: 96 },
               { x: "Jun", y: 204 },
             ],
           },
         ]}
         margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
         xScale={{
           type: "point",
         }}
         yScale={{
           type: "linear",
         }}
         axisTop={null}
         axisRight={null}
         axisBottom={{
           tickSize: 0,
           tickPadding: 16,
         }}
         axisLeft={{
           tickSize: 0,
           tickValues: 5,
           tickPadding: 16,
         }}
         colors={["#2563eb", "#e11d48"]}
         pointSize={6}
         useMesh={true}
         gridYValues={6}
         theme={{
           tooltip: {
             chip: {
               borderRadius: "9999px",
             },
             container: {
               fontSize: "12px",
               textTransform: "capitalize",
               borderRadius: "6px",
             },
           },
           grid: {
             line: {
               stroke: "#f3f4f6",
             },
           },
         }}
         role="application"
       />
     </div>
   )
 }
 
 
 function PackageIcon(props) {
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
       <path d="m7.5 4.27 9 5.15" />
       <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
       <path d="m3.3 7 8.7 5 8.7-5" />
       <path d="M12 22V12" />
     </svg>
   )
 }
 
 
 function ShoppingCartIcon(props) {
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
       <circle cx="8" cy="21" r="1" />
       <circle cx="19" cy="21" r="1" />
       <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
     </svg>
   )
 }
 
 
 function TriangleAlertIcon(props) {
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
       <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
       <path d="M12 9v4" />
       <path d="M12 17h.01" />
     </svg>
   )
 }
 
 
 function TruckIcon(props) {
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
       <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
       <path d="M15 18H9" />
       <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
       <circle cx="17" cy="18" r="2" />
       <circle cx="7" cy="18" r="2" />
     </svg>
   )
 }
 
 
 function UsersIcon(props) {
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
       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
       <circle cx="9" cy="7" r="4" />
       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
     </svg>
   )
 }