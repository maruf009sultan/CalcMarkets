import type { Calculator } from '../../../../types';
import { parseSeries, mean, stdDev, formatNumber } from '../../../../utils/helpers';

export const zScoreCalculator: Calculator = {
    id: 'z-score',
    name: 'Z-Score',
    description: 'Calculate how many standard deviations a data point is from the mean.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'data', label: 'Data Series', type: 'textarea', placeholder: '10, 12, 15, 14, 16, 13, 11', info: 'Comma-separated values' },
        { name: 'value', label: 'Current Value', type: 'number', placeholder: '17' },
    ],
    calculate: (i) => {
        const data = parseSeries(i.data as string);
        const value = i.value as number;
        if (data.length < 2) return { error: 'At least two data points are needed.' };
        const mu = mean(data);
        const sd = stdDev(data);
        if (sd === 0) return { error: 'Standard deviation is zero.' };
        const z = (value - mu) / sd;
        return { label: 'Z-Score', value: formatNumber(z, 4) };
    }
};