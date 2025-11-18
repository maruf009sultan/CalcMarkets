import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const optionsProfitCalculator: Calculator = {
    id: 'options-profit',
    name: 'Options Profit',
    description: 'Calculate the profit or loss for a single leg options trade.',
    category: 'Options',
    inputs: [
        { name: 'strikePrice', label: 'Strike Price', type: 'number', placeholder: '100' },
        { name: 'premium', label: 'Premium Paid/Received per Share', type: 'number', placeholder: '2.50' },
        { name: 'exitPrice', label: 'Stock Price at Expiry', type: 'number', placeholder: '110' },
        { name: 'contracts', label: 'Number of Contracts', type: 'number', placeholder: '10', defaultValue: '1'},
    ],
    calculate: (i) => {
        const K = i.strikePrice as number, P = i.premium as number, S = i.exitPrice as number, C = i.contracts as number;
        const shares = C * 100;
        const longCallProfit = (Math.max(0, S - K) - P) * shares;
        const longPutProfit = (Math.max(0, K - S) - P) * shares;
        const shortCallProfit = (P - Math.max(0, S - K)) * shares;
        const shortPutProfit = (P - Math.max(0, K - S)) * shares;
        return [
            { label: 'Long Call Profit', value: formatCurrency(longCallProfit) },
            { label: 'Long Put Profit', value: formatCurrency(longPutProfit) },
            { label: 'Short Call Profit', value: formatCurrency(shortCallProfit) },
            { label: 'Short Put Profit', value: formatCurrency(shortPutProfit) },
        ];
    },
};