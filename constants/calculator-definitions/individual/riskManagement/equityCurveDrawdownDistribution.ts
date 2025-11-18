import type { Calculator, CalculationResult } from '../../../../types';
import { parseSeries, formatCurrency, formatPercent, formatNumber } from '../../../../utils/helpers';

export const equityCurveDrawdownDistributionCalculator: Calculator = {
    id: 'equity-curve-drawdown-distribution',
    name: 'Equity Curve Drawdown Distribution',
    description: 'Analyze the frequency and magnitude of drawdowns in an equity curve.',
    category: 'Risk Management',
    inputs: [
        { name: 'equityValues', label: 'Equity Curve Values', type: 'textarea', placeholder: '10000, 10100, 10050, 10200, 10300, 9800, 10500', info: 'Comma-separated equity values over time' },
        { name: 'bins', label: 'Number of Bins', type: 'number', placeholder: '5', defaultValue: '5' },
    ],
    calculate: (inputs): CalculationResult => {
        const equityCurve = parseSeries(inputs.equityValues as string);
        const numBins = inputs.bins as number;

        if (equityCurve.length < 2) {
            return { error: 'At least two equity points are needed.' };
        }

        let peak = equityCurve[0];
        const drawdowns: number[] = [];
        for (let i = 1; i < equityCurve.length; i++) {
            peak = Math.max(peak, equityCurve[i]);
            const drawdown = (peak - equityCurve[i]) / peak;
            if (drawdown > 0) {
                drawdowns.push(drawdown);
            }
        }

        if (drawdowns.length === 0) {
            return { label: 'Result', value: 'No drawdowns occurred in this equity curve.' };
        }

        const maxDd = Math.max(...drawdowns);
        if (maxDd === 0) {
             return { label: 'Result', value: 'No drawdowns occurred in this equity curve.' };
        }
        
        const binWidth = maxDd / numBins;
        const bins = Array(numBins).fill(0);
        for (const dd of drawdowns) {
            let binIndex = Math.floor(dd / binWidth);
            if (binIndex >= numBins) binIndex = numBins - 1;
            if (binIndex < 0) binIndex = 0;
            bins[binIndex]++;
        }

        const headers = ['Drawdown Range', 'Frequency', 'Percentage of Time'];
        const rows = bins.map((count, index) => {
            const rangeStart = index * binWidth;
            const rangeEnd = rangeStart + binWidth;
            const rangeLabel = `${formatPercent(rangeStart)} - ${formatPercent(rangeEnd)}`;
            const percentage = (count / equityCurve.length) * 100;
            return [rangeLabel, count, `${formatNumber(percentage, 1)}%`];
        });

        return {
            label: 'Drawdown Distribution',
            table: { headers, rows }
        };
    },
};
