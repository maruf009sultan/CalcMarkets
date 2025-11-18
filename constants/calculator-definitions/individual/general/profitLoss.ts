import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent } from '../../../../utils/helpers';

export const profitLossCalculator: Calculator = {
    id: 'profit-loss',
    name: 'Profit & Loss',
    description: 'Calculate the profit or loss from a trade, including optional fees.',
    category: 'General Trading',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '100.00' },
        { name: 'exitPrice', label: 'Exit Price', type: 'number', placeholder: '110.00' },
        { name: 'quantity', label: 'Quantity (Shares, units, etc.)', type: 'number', placeholder: '50' },
        { name: 'fees', label: 'Total Fees (Optional)', type: 'number', placeholder: '5.00', defaultValue: '0' },
    ],
    calculate: (i) => {
        const entry = i.entryPrice as number;
        const exit = i.exitPrice as number;
        const quantity = i.quantity as number;
        const fees = i.fees as number;
        if (quantity <= 0) return { error: "Quantity must be positive." };
        const pnl = (exit - entry) * quantity - fees;
        const initialCost = entry * quantity;
        if (initialCost === 0) return { error: "Initial cost cannot be zero for ROI calculation." };
        const roi = (pnl / initialCost);
        return [
            { label: 'Gross P&L', value: formatCurrency((exit - entry) * quantity) },
            { label: 'Net P&L', value: formatCurrency(pnl) },
            { label: 'Return on Investment', value: formatPercent(roi) },
        ];
    },
};