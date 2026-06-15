import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
   data: OpenMeteoResponse | undefined;
}

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 70 },
   {
      field: 'label',
      headerName: 'Hora',
      width: 100,
   },
   {
      field: 'value1',
      headerName: 'Temperatura (°C)',
      width: 150,
   },
   {
      field: 'value2',
      headerName: 'Viento (km/h)',
      width: 130,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 100,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
];

export default function TableUI({ data }: TableUIProps) {
   if (!data) return <Typography variant="body2">Cargando datos...</Typography>;

   const arrLabels = data.hourly.time.map(t => t.slice(11, 16));
   const rows = combineArrays(arrLabels, data.hourly.temperature_2m, data.hourly.wind_speed_10m);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}
