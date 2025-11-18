import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const copperPlatinumPlCalculator: Calculator = {
    id: 'copper-platinum-pl',
    name: 'Copper/Platinum P&L',
    description: 'Calculate P&L for Copper (25,000 lbs) or Platinum (50 oz) futures.',
    category: 'Commodities & Niche',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '4.50' },
        { name: 'exitPrice', label: 'Exit Price', type: 'number', placeholder: '4.65' },
        { name: 'contractSize', label: 'Contract Size (Multiplier)', type: 'number', placeholder: '25000', info: 'Copper: 25000, Platinum: 50' },
        { name: 'contracts', label: 'Number of Contracts', type: 'number', placeholder: '1' },
    ],
    calculate: (i) => {
        const { entryPrice, exitPrice, contractSize, contracts } = i as { [key: string]: number };
        const pnl = (exitPrice - entryPrice) * contractSize * contracts;
        return { label: 'Profit/Loss', value: formatCurrency(pnl) };
    }
};