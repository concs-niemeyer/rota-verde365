import React from 'react';
// Fazer um css para ajustar a tabela.
import '../../../styles/table.css'

export const Table = ({ children }) => (
  <table>
    {children}
  </table>
);

export const TableHeader = ({ children }) => (
  <thead>
    {children}
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

export const TableFooter = ({ children }) => (
  <tfoot>
    {children}
  </tfoot>
);

export const TableRow = ({ children }) => (
  <tr>
    {children}
  </tr>
);

export const TableHead = ({ children }) => (
  <th>
    {children}
  </th>
);

export const TableCell = ({ children }) => (
  <td>
    {children}
  </td>
);
