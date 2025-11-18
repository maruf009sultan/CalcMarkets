import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const epsCalculator: Calculator = {
    id: 'eps',
    name: 'Earnings Per Share (EPS)',
    description: 'Calculate a company\'s profitability on a per-share basis.',
    category: 'Stocks & Bonds',
    inputs: [
        { name: 'netIncome', label: 'Net Income', type: 'number', placeholder: '10000000' },
        { name: 'prefDividends', label: 'Preferred Dividends', type: 'number', placeholder: '1000000', defaultValue: '0' },
        { name: 'shares', label: 'Outstanding Shares', type: 'number', placeholder: '5000000' },
    ],
    calculate: (i) => {
        const shares = i.shares as number;
        if (shares <= 0) return { error: "Outstanding shares must be positive." };
        return { label: 'Earnings Per Share (EPS)', value: formatCurrency(((i.netIncome as number) - (i.prefDividends as number)) / shares) };
    },
};