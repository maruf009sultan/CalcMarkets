import type { Calculator, CalculationResult } from '../../../../types';
import { parseSeries, formatCurrency, formatNumber } from '../../../../utils/helpers';

export const profitDistributionVisualizerCalculator: Calculator = {
    id: 'profit-distribution-visualizer',
    name: 'Profit Distribution Visualizer',
    description: 'Analyze and visualize the distribution of profits and losses from a series of trades.',
    category: 'Meta Calculators',
    inputs: [
        { name: 'trades', label: 'Trade P&L Series', type: 'textarea', placeholder: '150, -50, 200, 300, -75, 120, 80, -90, 220, -110', info: 'Comma-separated P&L for each trade' },
        { name: 'bins', label: 'Number of Bins', type: 'number', placeholder: '5', defaultValue: '5' },
    ],
    calculate: (inputs): CalculationResult => {
        const trades = parseSeries(inputs.trades as string);
        const numBins = inputs.bins as number;

        if (trades.length < 2) {
            return { error: 'At least two trades are needed for a distribution.' };
        }
        if (numBins <= 0) {
            return { error: 'Number of bins must be positive.' };
        }

        const minPnl = Math.min(...trades);
        const maxPnl = Math.max(...trades);
        
        if (minPnl === maxPnl) {
            return { error: 'All trades have the same P&L; a distribution cannot be formed.' };
        }

        const binWidth = (maxPnl - minPnl) / numBins;
        const bins = Array(numBins).fill(0);
        
        for (const trade of trades) {
            let binIndex = Math.floor((trade - minPnl) / binWidth);
            // Handle the maximum value edge case
            if (binIndex === numBins) {
                binIndex--;
            }
            bins[binIndex]++;
        }

        const headers = ['P&L Range', 'Frequency', 'Percentage'];
        const rows = bins.map((count, index) => {
            const rangeStart = minPnl + (index * binWidth);
            const rangeEnd = rangeStart + binWidth;
            const rangeLabel = `${formatCurrency(rangeStart)} to ${formatCurrency(rangeEnd)}`;
            const percentage = (count / trades.length) * 100;
            return [rangeLabel, count, `${formatNumber(percentage, 1)}%`];
        });

        return {
            label: 'Profit/Loss Distribution',
            table: { headers, rows }
        };
    },
};
