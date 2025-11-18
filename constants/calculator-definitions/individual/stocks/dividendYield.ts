import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const dividendYieldCalculator: Calculator = {
    id: 'dividend-yield',
    name: 'Dividend Yield',
    description: 'Calculate the dividend yield of a stock as a percentage of its price.',
    category: 'Stocks & Bonds',
    inputs: [
        { name: 'annualDividend', label: 'Annual Dividend per Share', type: 'number', placeholder: '5.00' },
        { name: 'stockPrice', label: 'Current Stock Price', type: 'number', placeholder: '120.00' },
    ],
    calculate: (i) => {
        const stockPrice = i.stockPrice as number;
        if (stockPrice <= 0) return { error: "Stock price must be positive." };
        return { label: 'Dividend Yield', value: formatPercent((i.annualDividend as number) / stockPrice) };
    },
};