import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBrands } from '../../ServiceLayer';
import ListTable from './ListTable';
import { Layers2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import AddItemProperty from './AddItemProperty';

export default function Brand() {
  const { data: brands = [], error, isLoading, refetch } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  const handleDeleteItemToast = () => { 
    toast.success(`${headers[0].displayName} telah berhasil dihapus`);
  };

  const handleSuccessEditedToast = () => {
    toast.success('Perubahan telah berhasil diterapkan');
  };

  const handleFailEditedToast = () => {
    toast.error(`Gagal merubah ${headers[0].displayName}, ${headers[0].displayName} sudah ada`);
  };

  const refetchItems = () => {
    refetch();
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
  if (error) return <div>Error: {error.message}</div>;

  const headers = [
    { displayName: 'Merek', key: 'brand' },
    { displayName: 'Deskripsi', key: 'description' },
    { displayName: 'Aksi', key: 'actions' }
  ];

  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8">
        <div className='flex items-center'>
          <Layers2 className="w-6 h-6 mr-2" />
          <h1 className="font-semibold text-lg md:text-2xl">Merek</h1>
        </div>
        <ListTable 
          data={brands} 
          headers={headers}
          reloadData={refetchItems}
          onDeleteToast={handleDeleteItemToast}
          onSuccessToast={handleSuccessEditedToast}
          onFailToEditToast={handleFailEditedToast}/>
        <Toaster richColors />
      </main>
    </>
  );
}

