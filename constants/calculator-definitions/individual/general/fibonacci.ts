import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const fibonacciCalculator: Calculator = {
    id: 'fibonacci',
    name: 'Fibonacci',
    description: 'Calculate Fibonacci retracement and extension levels.',
    category: 'General Trading',
    inputs: [
        { name: 'high', label: 'High Price', type: 'number', placeholder: '200' },
        { name: 'low', label: 'Low Price', type: 'number', placeholder: '150' },
    ],
    calculate: (i) => {
        const high = i.high as number;
        const low = i.low as number;
        if (low >= high) return { error: "Low price must be less than high price." };
        const diff = high - low;
        return [
            { label: 'Retracement 23.6%', value: formatNumber(high - diff * 0.236) },
            { label: 'Retracement 38.2%', value: formatNumber(high - diff * 0.382) },
            { label: 'Retracement 50.0%', value: formatNumber(high - diff * 0.5) },
            { label: 'Retracement 61.8%', value: formatNumber(high - diff * 0.618) },
            { label: 'Extension 161.8%', value: formatNumber(high + diff * 0.618) },
            { label: 'Extension 261.8%', value: formatNumber(high + diff * 1.618) },
        ];
    },
};