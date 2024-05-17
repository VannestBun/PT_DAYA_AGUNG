import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function InventoryLayout() {
  const activeStyle = {
    color: '#000',
    fontWeight: 'bold',
  };

  return (
    <>
      <header className="flex items-center px-4 pb-2 border-b shrink-0 md:px-6">
        <nav className="flex-col text-base hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 mb-2">
          <NavLink to="/inventory" className="text-gray-500 dark:text-gray-400 transition-all" style={({ isActive }) => isActive ? activeStyle : null} end>
            Barang
          </NavLink>
          <NavLink to="/inventory/penjualan" className="text-gray-500 dark:text-gray-400 transition-all" style={({ isActive }) => isActive ? activeStyle : null}>
            Penjualan
          </NavLink>
          <NavLink to="/inventory/satuan" className="text-gray-500 dark:text-gray-400 transition-all" style={({ isActive }) => isActive ? activeStyle : null}>
            Satuan
          </NavLink>
          <NavLink to="/inventory/jenis" className="text-gray-500 dark:text-gray-400 transition-all" style={({ isActive }) => isActive ? activeStyle : null}>
            Jenis
          </NavLink>
          <NavLink to="/inventory/merek" className="text-gray-500 dark:text-gray-400 transition-all" style={({ isActive }) => isActive ? activeStyle : null}>
            Merek
          </NavLink>
          <NavLink to="/inventory/gudang" className="text-gray-500 dark:text-gray-400 transition-all" style={({ isActive }) => isActive ? activeStyle : null}>
            Gudang
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
