import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const cryptoProfitCalculator: Calculator = {
    id: 'crypto-profit',
    name: 'Crypto Profit',
    description: 'Calculate profit or loss from a cryptocurrency trade.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'buyPrice', label: 'Buy Price per Coin', type: 'number', placeholder: '40000' },
        { name: 'sellPrice', label: 'Sell Price per Coin', type: 'number', placeholder: '45000' },
        { name: 'quantity', label: 'Quantity (e.g., BTC)', type: 'number', placeholder: '0.5' },
        { name: 'fees', label: 'Total Fees (USD)', type: 'number', placeholder: '50', defaultValue: '0' },
    ],
    calculate: (i) => {
        const pnl = ((i.sellPrice as number) - (i.buyPrice as number)) * (i.quantity as number) - (i.fees as number);
        return { label: 'Net Profit/Loss', value: formatCurrency(pnl) };
    },
};