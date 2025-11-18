import type { Calculator } from '../../../../types';
import { parseSeries, mean, sum, formatPercent, formatNumber } from '../../../../utils/helpers';

export const kellyVsOptimalFCalculator: Calculator = {
    id: 'kelly-vs-optimal-f',
    name: 'Kelly vs. Optimal F (Ralph Vince)',
    description: 'Compare Kelly Criterion with Optimal F for position sizing.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'trades', label: 'Trade P&L ($)', type: 'textarea', placeholder: '1500, -500, 2000, 3000, -750', info: 'Comma-separated P&L for each trade' },
        { name: 'largestLoss', label: 'Largest Loss ($)', type: 'number', placeholder: '1000', info: 'Enter as a positive number' },
    ],
    calculate: (i) => {
        const trades = parseSeries(i.trades as string);
        const largestLoss = -(i.largestLoss as number);
        if (trades.length < 10) return { error: 'More trade data is recommended for a stable result.' };
        if (largestLoss >= 0) return { error: 'Largest loss must be a negative value (user enters positive).' };

        // Kelly Criterion (simplified from P&L data)
        const wins = trades.filter(t => t > 0);
        const winProb = wins.length / trades.length;
        const avgWin = mean(wins);
        const avgLoss = Math.abs(mean(trades.filter(t => t < 0)));
        const winLossRatio = avgWin / avgLoss;
        const kelly = (winProb * winLossRatio - (1 - winProb)) / winLossRatio;

        // Optimal F
        let optimalF = 0;
        let maxTWR = 0;
        for (let f = 0.01; f <= 1; f += 0.01) {
            let twr = 1;
            for(const trade of trades) {
                twr *= (1 + f * (trade / largestLoss));
            }
            if (twr > maxTWR) {
                maxTWR = twr;
                optimalF = f;
            }
        }

        return [
            { label: 'Kelly Criterion %', value: formatPercent(kelly > 0 ? kelly : 0) },
            { label: 'Optimal F %', value: formatPercent(optimalF) },
            { label: 'Optimal F TWR', value: formatNumber(maxTWR, 2) },
        ];
    },
};
