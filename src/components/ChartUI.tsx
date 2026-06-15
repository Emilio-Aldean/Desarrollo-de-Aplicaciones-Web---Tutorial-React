import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
   data: OpenMeteoResponse | undefined;
}

export default function ChartUI({ data }: ChartUIProps) {
   if (!data) return <Typography variant="body2">Cargando datos...</Typography>;

   const arrLabels = data.hourly.time.map(t => t.slice(11, 16));
   const arrValues1 = data.hourly.temperature_2m;
   const arrValues2 = data.hourly.wind_speed_10m;

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura y Viento — Hoy
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: arrValues1, label: `Temperatura (${data.hourly_units.temperature_2m})`},
               { data: arrValues2, label: `Viento (${data.hourly_units.wind_speed_10m})`},
            ]}
            xAxis={[{ scaleType: 'point', data: arrLabels }]}
         />
      </>
   );
}
