import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const electricityFuturesPlCalculator: Calculator = {
    id: 'electricity-futures-pl',
    name: 'Electricity Futures P&L',
    description: 'Calculate P&L for an electricity futures contract based on MWh.',
    category: 'Commodities & Niche',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price per MWh', type: 'number', placeholder: '45.50' },
        { name: 'exitPrice', label: 'Exit Price per MWh', type: 'number', placeholder: '48.00' },
        { name: 'mwhPerContract', label: 'MWh per Contract', type: 'number', placeholder: '736', info: 'e.g., Peak contract for a month with 31 days is 16h*23 weekdays*2 MWh/h' },
        { name: 'contracts', label: 'Number of Contracts', type: 'number', placeholder: '1' },
    ],
    calculate: (i) => {
        const { entryPrice, exitPrice, mwhPerContract, contracts } = i as { [key: string]: number };
        const pnl = (exitPrice - entryPrice) * mwhPerContract * contracts;
        return { label: 'Profit/Loss', value: formatCurrency(pnl) };
    }
};