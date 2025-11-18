import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const breakEvenPriceCalculator: Calculator = {
    id: 'break-even-price',
    name: 'Break-Even Price',
    description: 'Calculate the price an asset must reach for a trade to break even, including commissions.',
    category: 'General Trading',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price per Share', type: 'number', placeholder: '50.00' },
        { name: 'quantity', label: 'Number of Shares', type: 'number', placeholder: '100' },
        { name: 'commission', label: 'Total Commission (Buy & Sell)', type: 'number', placeholder: '10.00', defaultValue: '0' },
    ],
    calculate: (i) => {
        const quantity = i.quantity as number;
        if (quantity <= 0) return { error: 'Quantity must be greater than zero.' };
        const bep = (i.entryPrice as number) + ((i.commission as number) / quantity);
        return { label: 'Break-Even Price per Share', value: formatCurrency(bep) };
    },
};