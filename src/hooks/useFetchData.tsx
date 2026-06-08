import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData(): OpenMeteoResponse | undefined {

    const [data, setData] = useState<OpenMeteoResponse>();

    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL);
            const json: OpenMeteoResponse = await response.json();
            setData(json);
        };
        fetchData();
    }, []);

    return data;
}
