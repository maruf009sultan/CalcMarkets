import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const vwapTwapCalculator: Calculator = {
    id: 'vwap-twap',
    name: 'VWAP & TWAP',
    description: 'Calculate Volume-Weighted and Time-Weighted Average Prices.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'data', label: 'Trade Data (Price,Volume)', type: 'textarea', placeholder: '100.10,500\n100.25,300\n100.15,700', info: 'Enter each period on a new line: Price,Volume' },
    ],
    calculate: (i) => {
        const lines = (i.data as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No trade data entered.' };
        
        let totalPV = 0;
        let totalVolume = 0;
        let totalPrice = 0;

        for(const line of lines) {
            const parts = line.split(',');
            if (parts.length !== 2) return { error: `Invalid format for line: "${line}"` };
            const price = parseFloat(parts[0]);
            const volume = parseFloat(parts[1]);
            if (isNaN(price) || isNaN(volume) || volume < 0) return { error: `Invalid number in line: "${line}"` };
            
            totalPV += price * volume;
            totalVolume += volume;
            totalPrice += price;
        }

        if (totalVolume === 0) return { error: 'Total volume cannot be zero.' };
        const vwap = totalPV / totalVolume;
        const twap = totalPrice / lines.length;
        
        return [
            { label: 'VWAP (Volume-Weighted)', value: formatNumber(vwap, 4) },
            { label: 'TWAP (Time-Weighted)', value: formatNumber(twap, 4) },
        ];
    }
};