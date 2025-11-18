import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const futuresPlCalculator: Calculator = {
    id: 'futures-pl',
    name: 'Futures P&L',
    description: 'Calculate the P&L for a generic futures contract.',
    category: 'Forex & Futures',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '2.850' },
        { name: 'exitPrice', label: 'Exit Price', type: 'number', placeholder: '2.950' },
        { name: 'multiplier', label: 'Contract Multiplier', type: 'number', placeholder: '10000', info: 'e.g., Nat Gas: 10000, Crude Oil: 1000, S&P 500 E-mini: 50' },
        { name: 'contracts', label: 'Number of Contracts', type: 'number', placeholder: '1' },
    ],
    calculate: (i) => {
        const pnl = ((i.exitPrice as number) - (i.entryPrice as number)) * (i.multiplier as number) * (i.contracts as number);
        return { label: 'Profit/Loss', value: formatCurrency(pnl) };
    }
};