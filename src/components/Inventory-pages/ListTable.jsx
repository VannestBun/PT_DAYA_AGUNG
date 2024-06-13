import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import EditItemProperty from './EditItemProperty';


export default function ListTable({ data, headers, reloadData, onDeleteToast, onSuccessToast, onFailToEditToast }) {
  return (
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
          {data.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.key}>
                  {header.key !== 'actions' ? item[header.key] : (
                    <EditItemProperty item={item} header={headers}
                    reloadData={reloadData}
                              onDeleteToast={onDeleteToast}
                              onSuccessToast={onSuccessToast}
                              onFailToEditToast={onFailToEditToast} />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}



