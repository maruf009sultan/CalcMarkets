import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const carbonCreditPlCalculator: Calculator = {
    id: 'carbon-credit-pl',
    name: 'Carbon Credit P&L',
    description: 'Calculate P&L for a standard carbon credit futures contract (1,000 credits).',
    category: 'Commodities & Niche',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price per Credit', type: 'number', placeholder: '15.75' },
        { name: 'exitPrice', label: 'Exit Price per Credit', type: 'number', placeholder: '16.50' },
        { name: 'contracts', label: 'Number of Contracts', type: 'number', placeholder: '5' },
    ],
    calculate: (i) => {
        const { entryPrice, exitPrice, contracts } = i as { [key: string]: number };
        const pnl = (exitPrice - entryPrice) * 1000 * contracts;
        return { label: 'Profit/Loss', value: formatCurrency(pnl) };
    }
};