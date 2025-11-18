import type { Calculator } from '../../../../types';
import { parseSeries, mean, sum, formatNumber } from '../../../../utils/helpers';

export const equityCurveSmoothnessCalculator: Calculator = {
    id: 'equity-curve-smoothness',
    name: 'Equity Curve Smoothness (K-Ratio)',
    description: 'Measure the consistency and smoothness of an equity curve\'s growth.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'equityValues', label: 'Equity Curve Values', type: 'textarea', placeholder: '10000, 10100, 10050, 10200, 10300', info: 'Comma-separated equity values over time' },
    ],
    calculate: (i) => {
        const equity = parseSeries(i.equityValues as string);
        if (equity.length < 2) return { error: 'At least two equity points are needed.' };
        const returns = [];
        for (let j = 1; j < equity.length; j++) {
            returns.push(Math.log(equity[j] / equity[j-1]));
        }
        const n = returns.length;
        const logReturns = returns.map((r, idx) => ({ x: idx + 1, y: r }));
        
        const meanX = mean(logReturns.map(p => p.x));
        const meanY = mean(logReturns.map(p => p.y));
        
        const numerator = sum(logReturns.map(p => (p.x - meanX) * (p.y - meanY)));
        const denominator = sum(logReturns.map(p => Math.pow(p.x - meanX, 2)));
        
        const slope = numerator / denominator;
        const stdErr = Math.sqrt(sum(logReturns.map(p => Math.pow(p.y - (slope * p.x), 2))) / (n-1));
        
        const kRatio = (slope / stdErr) * Math.sqrt(n);

        return { label: 'K-Ratio (Smoothness)', value: formatNumber(kRatio, 3) };
    }
};