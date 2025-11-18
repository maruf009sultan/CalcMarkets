import type { Calculator } from '../../../../types';
import { parseSeries, mean, sum, formatNumber, formatPercent } from '../../../../utils/helpers';

export const alphaBetaCalculator: Calculator = {
    id: 'alpha-beta',
    name: 'Alpha & Beta',
    description: 'Calculate the Alpha and Beta of an asset relative to a benchmark market index.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'assetReturns', label: 'Asset Returns (%)', type: 'textarea', placeholder: '2, -1, 3, 1.5, 2.5', info: 'Comma-separated values' },
        { name: 'marketReturns', label: 'Market Returns (%)', type: 'textarea', placeholder: '1, -0.5, 2, 1, 1.5', info: 'Comma-separated values' },
        { name: 'riskFreeRate', label: 'Annual Risk-Free Rate (%)', type: 'number', placeholder: '3' },
    ],
    calculate: (i) => {
        const stock = parseSeries(i.assetReturns as string).map(r => r / 100);
        const market = parseSeries(i.marketReturns as string).map(r => r / 100);
        if (stock.length !== market.length || stock.length < 2) return { error: "Series must have same length and at least 2 points." };
        
        const n = stock.length;
        const meanS = mean(stock);
        const meanM = mean(market);
        
        const covar = sum(stock.map((s, idx) => (s - meanS) * (market[idx] - meanM))) / (n - 1);
        const varianceM = sum(market.map(m => Math.pow(m - meanM, 2))) / (n - 1);
        
        if (varianceM === 0) return { error: 'Market variance cannot be zero.' };
        const beta = covar / varianceM;
        
        const rf = (i.riskFreeRate as number) / 100 / n; // Period risk-free rate
        const alpha = (meanS - rf) - beta * (meanM - rf);

        return [
            { label: 'Beta', value: formatNumber(beta, 3) },
            { label: 'Alpha (Period)', value: formatPercent(alpha) },
            { label: 'Alpha (Annualized)', value: formatPercent(alpha * n) },
        ];
    },
};