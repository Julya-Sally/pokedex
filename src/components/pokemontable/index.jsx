import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function pokemontable({pokemonData}) {
  const {height, weight} = pokemonData
  return (
    <TableContainer component={Paper} sx={{boxShadow: "none"}}>
      <Table size="small" aria-label="a dense table">
        <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{"Height (cm)"}</TableCell>
              <TableCell>{height}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{"Weight (g)"}</TableCell>
              <TableCell>{weight}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{"Type"}</TableCell>
              <TableCell>{pokemonData.types.map(t => t.type.name).join(', ')}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
