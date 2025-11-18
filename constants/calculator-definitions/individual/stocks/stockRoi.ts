import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const stockRoiCalculator: Calculator = {
    id: 'stock-roi',
    name: 'Stock ROI',
    description: 'Calculate the total Return on Investment for a stock, including dividends.',
    category: 'Stocks & Bonds',
    inputs: [
        { name: 'purchasePrice', label: 'Purchase Price per Share', type: 'number', placeholder: '100' },
        { name: 'sellPrice', label: 'Current/Sell Price per Share', type: 'number', placeholder: '120' },
        { name: 'dividends', label: 'Total Dividends Received per Share', type: 'number', placeholder: '5', defaultValue: '0' },
    ],
    calculate: (i) => {
        const purchasePrice = i.purchasePrice as number;
        if (purchasePrice <= 0) return { error: "Purchase price must be positive."};
        const roi = (((i.sellPrice as number) - purchasePrice + (i.dividends as number)) / purchasePrice);
        return { label: 'Total ROI', value: formatPercent(roi) };
    },
};