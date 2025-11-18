import type { Calculator, CalculationResult } from '../../../../types';
import { parseSeries, formatNumber, rolling, linearRegression } from '../../../../utils/helpers';

export const rollingRegressionBetaCalculator: Calculator = {
    id: 'rolling-regression-beta',
    name: 'Rolling Regression Beta',
    description: 'Calculate Beta over a rolling window to see how it changes over time.',
    category: 'Quantitative Finance',
    inputs: [
        { name: 'assetReturns', label: 'Asset Returns (%)', type: 'textarea', placeholder: '2, -1, 3, 1.5, 2.5, ...', info: 'Comma-separated values' },
        { name: 'marketReturns', label: 'Market Returns (%)', type: 'textarea', placeholder: '1, -0.5, 2, 1, 1.5, ...', info: 'Comma-separated values' },
        { name: 'period', label: 'Rolling Period', type: 'number', placeholder: '30' },
    ],
    calculate: (i): CalculationResult => {
        const asset = parseSeries(i.assetReturns as string);
        const market = parseSeries(i.marketReturns as string);
        const period = i.period as number;
        if (asset.length !== market.length) return { error: "Series must have the same length." };
        if (asset.length < period) return { error: `Not enough data for period ${period}.` };

        const combined = asset.map((a, idx) => ({ x: market[idx], y: a }));

        const betas = rolling(combined, period, (slice: {x: number, y: number}[]) => {
            return linearRegression(slice).slope;
        });

        const headers = ['Window End', 'Beta'];
        const rows = betas.map((beta, idx) => [period + idx, formatNumber(beta, 3)]);
        
        return {
            label: `Rolling Beta (${period}-Period)`,
            table: { headers, rows }
        };
    },
};
