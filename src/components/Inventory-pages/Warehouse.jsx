import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchWarehouses } from '../../ServiceLayer'
import ListTable from './ListTable'
import { WarehouseIcon } from 'lucide-react'
import { Toaster, toast } from 'sonner'

export default function Warehouse() {
  const { data: warehouses = [], error, isLoading, refetch } = useQuery({
    queryKey: ['warehouses'],
    queryFn: fetchWarehouses,
  })

  const handleDeleteItemToast = () => {
    toast.success('Gudang telah berhasil dihapus')
  }

  const handleSuccessEditedToast = () => {
    toast.success('Perubahan telah berhasil diterapkan')
  }

  const handleFailEditedToast = () => {
    toast.error('Gagal merubah gudang')
  }

  const refetchItems = () => {
    refetch()
  }

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )

  if (error) return <div>Error: {error.message}</div>

  const headers = [
    { displayName: 'Gudang', key: 'warehouse' },
    { displayName: 'Deskripsi', key: 'description' },
    { displayName: 'Aksi', key: 'actions' }
  ]

  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8">
        <div className='flex items-center'>
          <WarehouseIcon className="w-6 h-6 mr-2" />
          <h1 className="font-semibold text-lg md:text-2xl">Gudang</h1>
        </div>
        <ListTable 
          data={warehouses} 
          headers={headers}
          reloadData={refetchItems}
          onDeleteToast={handleDeleteItemToast}
          onSuccessToast={handleSuccessEditedToast}
          onFailToEditToast={handleFailEditedToast}
        />
        <Toaster richColors />
      </main>
    </>
  )
}
