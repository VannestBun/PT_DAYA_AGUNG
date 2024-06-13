import React from 'react'
import { Tags } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchTypes } from '../../ServiceLayer';
import ListTable from './ListTable';

export default function Type() {
    const { data: types = [], error, isLoading } = useQuery({
      queryKey: ['types'],
      queryFn: fetchTypes,
    });
  
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
      { displayName: 'Jenis', key: 'type' },
      { displayName: 'Deskripsi', key: 'description' },
      { displayName: 'Aksi', key: 'actions' }
    ];
  
    return (
      <>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8">
          <div className='flex items-center'>
            <Tags className="w-6 h-6 mr-2" />
            <h1 className="font-semibold text-lg md:text-2xl">Jenis</h1>
          </div>
          <ListTable data={types} headers={headers} />
        </main>
      </>
    );
  }



