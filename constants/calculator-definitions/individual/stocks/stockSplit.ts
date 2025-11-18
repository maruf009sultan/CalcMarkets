import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const stockSplitCalculator: Calculator = {
    id: 'stock-split',
    name: 'Stock Split',
    description: 'Calculate your new share count and price after a stock split or reverse split.',
    category: 'Stocks & Bonds',
    inputs: [
        { name: 'shares', label: 'Current Number of Shares', type: 'number', placeholder: '100' },
        { name: 'price', label: 'Current Share Price', type: 'number', placeholder: '200' },
        { name: 'split_for', label: 'Split Ratio (For)', type: 'number', placeholder: '2', info: 'e.g., for a 2-for-1 split, enter 2' },
        { name: 'split_from', label: 'Split Ratio (From)', type: 'number', placeholder: '1', info: 'e.g., for a 2-for-1 split, enter 1' },
    ],
    calculate: (i) => {
        const { shares, price, split_for, split_from } = i as { [key: string]: number };
        if (split_from <= 0) return { error: 'Split ratio "from" value must be positive.' };
        const newShares = shares * (split_for / split_from);
        const newPrice = price * (split_from / split_for);
        return [
            { label: 'New Number of Shares', value: formatNumber(newShares) },
            { label: 'New Price per Share', value: formatCurrency(newPrice) },
        ];
    }
};