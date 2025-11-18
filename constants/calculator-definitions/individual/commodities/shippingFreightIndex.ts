import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const shippingFreightIndexCalculator: Calculator = {
    id: 'shipping-freight-index',
    name: 'Shipping Freight Index P&L',
    description: 'Calculate the P&L for a shipping freight futures contract (e.g., Baltic Dry Index).',
    category: 'Commodities & Niche',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price (Index Points)', type: 'number', placeholder: '1500' },
        { name: 'exitPrice', label: 'Exit Price (Index Points)', type: 'number', placeholder: '1550' },
        { name: 'multiplier', label: 'Multiplier ($ per point)', type: 'number', placeholder: '10' },
        { name: 'contracts', label: 'Number of Contracts', type: 'number', placeholder: '1' },
    ],
    calculate: (i) => {
        const { entryPrice, exitPrice, multiplier, contracts } = i as { [key: string]: number };
        const pnl = (exitPrice - entryPrice) * multiplier * contracts;
        return { label: 'Profit/Loss', value: formatCurrency(pnl) };
    }
};