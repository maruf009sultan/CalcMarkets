import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const pipValueCalculator: Calculator = {
    id: 'pip-value',
    name: 'Pip Value',
    description: 'Calculate the value of a single pip for a forex trade.',
    category: 'Forex & Futures',
    inputs: [
        { name: 'lotSize', label: 'Lot Size (Units)', type: 'number', placeholder: '100000', info: "Standard=100k, Mini=10k, Micro=1k" },
        { name: 'quoteCurrencyRate', label: 'Quote Currency to USD Rate', type: 'number', placeholder: '1.00', info: 'e.g., for EUR/JPY, use USD/JPY rate. For USD pairs (EUR/USD), use 1.'},
    ],
    calculate: (i) => {
        const quoteRate = i.quoteCurrencyRate as number;
        if(quoteRate <= 0) return { error: "Exchange rate must be positive."};
        const pip = 0.0001; // For most pairs
        const pipValue = (pip / quoteRate) * (i.lotSize as number);
        return { label: 'Pip Value', value: formatCurrency(pipValue) };
    },
};