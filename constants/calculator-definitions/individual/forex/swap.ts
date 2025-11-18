import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const swapCalculator: Calculator = {
    id: 'swap-calculator',
    name: 'Swap (Overnight Interest)',
    description: 'Calculate the overnight interest (swap) credited or debited for a forex position.',
    category: 'Forex & Futures',
    inputs: [
        { name: 'lotSize', label: 'Lot Size (Units)', type: 'number', placeholder: '100000' },
        { name: 'swapRate', label: 'Swap Rate (in points)', type: 'number', placeholder: '-0.85', info: 'Use negative for debit, positive for credit' },
        { name: 'pipValue', label: 'Pip Value (in USD)', type: 'number', placeholder: '10' },
    ],
    calculate: (i) => {
        const { lotSize, swapRate, pipValue } = i as { [key: string]: number };
        const swapCost = (swapRate / 10) * pipValue * (lotSize / 100000); // Swap points are usually 1/10th of a pip
        return { label: 'Overnight Swap Cost/Credit', value: formatCurrency(swapCost) };
    }
};