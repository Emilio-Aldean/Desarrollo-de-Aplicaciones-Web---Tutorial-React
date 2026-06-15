import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'Quito':     { latitude: -0.2295, longitude: -78.5243 },
    'Manta':     { latitude: -0.9677, longitude: -80.7089 },
    'Cuenca':    { latitude: -2.9001, longitude: -79.0059 },
};

export default function useFetchData(selectedOption: string | null): OpenMeteoResponse | undefined {

    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS['Guayaquil'];
                const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&hourly=temperature_2m,wind_speed_10m&forecast_days=1`;
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData: OpenMeteoResponse = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedOption]); // El efecto secundario depende de la opción seleccionada

    return data;
}
