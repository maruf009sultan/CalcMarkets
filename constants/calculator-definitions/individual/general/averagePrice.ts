import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const averagePriceCalculator: Calculator = {
    id: 'average-price',
    name: 'Average Price',
    description: 'Calculate the average entry price after multiple buys of the same asset.',
    category: 'General Trading',
    inputs: [
        { name: 'trades', label: 'Trades (Quantity,Price)', type: 'textarea', placeholder: '10,100\n20,95\n15,102', info: 'Enter each trade on a new line: quantity,price' },
    ],
    calculate: (i) => {
        const lines = (i.trades as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No trades entered.' };
        let totalCost = 0;
        let totalQuantity = 0;
        for (const line of lines) {
            const parts = line.split(',');
            if (parts.length !== 2) return { error: `Invalid format for line: "${line}"` };
            const qty = parseFloat(parts[0]);
            const price = parseFloat(parts[1]);
            if (isNaN(qty) || isNaN(price) || qty <= 0 || price < 0) return { error: `Invalid number in line: "${line}"` };
            totalCost += qty * price;
            totalQuantity += qty;
        }
        if (totalQuantity === 0) return { error: 'Total quantity cannot be zero.' };
        const avgPrice = totalCost / totalQuantity;
        return [
            { label: 'Total Quantity', value: formatNumber(totalQuantity, 4) },
            { label: 'Total Cost', value: formatCurrency(totalCost) },
            { label: 'Average Price', value: formatCurrency(avgPrice, 'USD').replace('$', '') },
        ];
    },
};