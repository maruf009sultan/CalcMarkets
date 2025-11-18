import type { Calculator } from '../../../../types';
import { parseSeries, formatPercent } from '../../../../utils/helpers';

export const winProbabilityCalculator: Calculator = {
    id: 'win-probability',
    name: 'Trade Win Probability Estimator',
    description: 'Estimate the historical win probability from a series of trade outcomes.',
    category: 'Risk Management',
    inputs: [
        { name: 'trades', label: 'Trade P&L', type: 'textarea', placeholder: '150, -50, 200, 300, -75, 120', info: 'Comma-separated P&L for each trade' },
    ],
    calculate: (i) => {
        const trades = parseSeries(i.trades as string);
        if (trades.length === 0) return { error: 'No trades entered.' };
        const wins = trades.filter(t => t > 0).length;
        const winProb = wins / trades.length;
        return [
            { label: 'Total Trades', value: trades.length },
            { label: 'Winning Trades', value: wins },
            { label: 'Losing Trades', value: trades.length - wins },
            { label: 'Estimated Win Probability', value: formatPercent(winProb) },
        ];
    }
};