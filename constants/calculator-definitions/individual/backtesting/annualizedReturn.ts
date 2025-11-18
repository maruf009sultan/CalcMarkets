import type { Calculator } from '../../../../types';
import { parseSeries, formatPercent } from '../../../../utils/helpers';

export const annualizedReturnCalculator: Calculator = {
    id: 'annualized-return-cagr-periods',
    name: 'Annualized Return (from periods)',
    description: 'Calculate the annualized return (geometric mean) from a series of periodic returns.',
    category: 'Backtesting & Strategy Engineering',
    inputs: [
        { name: 'returns', label: 'Periodic Returns (%)', type: 'textarea', placeholder: '10, -5, 8, 12, -2', info: 'Comma-separated returns (e.g., monthly or quarterly)' },
        { name: 'periodsPerYear', label: 'Periods per Year', type: 'number', placeholder: '12', info: 'e.g., 12 for monthly, 4 for quarterly, 252 for daily' },
    ],
    calculate: (i) => {
        const returns = parseSeries(i.returns as string).map(r => 1 + (r / 100));
        const periodsPerYear = i.periodsPerYear as number;
        if (returns.length === 0) return { error: 'No returns entered.' };

        const product = returns.reduce((acc, val) => acc * val, 1);
        const geometricMean = Math.pow(product, 1 / returns.length);
        const annualized = Math.pow(geometricMean, periodsPerYear) - 1;

        return { label: 'Annualized Return (CAGR)', value: formatPercent(annualized) };
    },
};
