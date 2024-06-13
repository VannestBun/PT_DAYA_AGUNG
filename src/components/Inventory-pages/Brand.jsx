import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBrands } from '../../ServiceLayer';
import ListTable from './ListTable';
import { Layers2 } from 'lucide-react';

export default function Brand() {
  const { data: brands = [], error, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });

  // so the reason you can't do it is because the toast is specific to inventory, therefore you need one for the specific component

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

  // Define the headers you want to display and the corresponding keys in the data
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
          {/* <button onClick={handleSuccessEditedToast}>click me for toast</button> */}
        </div>
        <ListTable data={brands} headers={headers} />
      </main>
    </>
  );
}