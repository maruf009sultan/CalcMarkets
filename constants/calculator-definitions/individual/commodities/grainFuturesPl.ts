import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const grainFuturesPlCalculator: Calculator = {
    id: 'grain-futures-pl',
    name: 'Grain Futures P&L (Corn/Wheat/Soy)',
    description: 'Calculate P&L for standard grain futures contracts.',
    category: 'Commodities & Niche',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price (Cents per bushel)', type: 'number', placeholder: '450.25' },
        { name: 'exitPrice', label: 'Exit Price (Cents per bushel)', type: 'number', placeholder: '460.50' },
        { name: 'contractSize', label: 'Contract Size (Bushels)', type: 'number', placeholder: '5000', info: 'Corn, Wheat, Soybeans are typically 5,000 bushels' },
        { name: 'contracts', label: 'Number of Contracts', type: 'number', placeholder: '1' },
    ],
    calculate: (i) => {
        const { entryPrice, exitPrice, contractSize, contracts } = i as { [key: string]: number };
        const priceChange = (exitPrice - entryPrice) / 100; // Convert cents to dollars
        const pnl = priceChange * contractSize * contracts;
        return { label: 'Profit/Loss', value: formatCurrency(pnl) };
    },
};
