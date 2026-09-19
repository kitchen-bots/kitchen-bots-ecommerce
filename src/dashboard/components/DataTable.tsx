import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export default function DataTable<T extends { id: string }>({
  columns, data, emptyMessage = 'No records found.', onRowClick
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="dash-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={col.className}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-12" style={{ color: 'var(--dash-muted)' }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr
                key={row.id}
                className={onRowClick ? 'cursor-pointer' : ''}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map(col => (
                  <td key={col.key} className={col.className}>
                    {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
