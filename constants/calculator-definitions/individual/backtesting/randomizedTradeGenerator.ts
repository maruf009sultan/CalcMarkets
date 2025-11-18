import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const randomizedTradeGeneratorCalculator: Calculator = {
    id: 'randomized-trade-generator',
    name: 'Randomized Trade Generator',
    description: 'Generate a random series of trades based on statistical inputs for Monte Carlo analysis.',
    category: 'Backtesting & Strategy Engineering',
    inputs: [
        { name: 'winRate', label: 'Win Rate (%)', type: 'number', placeholder: '60' },
        { name: 'avgWin', label: 'Average Win ($)', type: 'number', placeholder: '200' },
        { name: 'stdDevWin', label: 'Std. Dev. of Wins ($)', type: 'number', placeholder: '50' },
        { name: 'avgLoss', label: 'Average Loss ($)', type: 'number', placeholder: '150' },
        { name: 'stdDevLoss', label: 'Std. Dev. of Losses ($)', type: 'number', placeholder: '40' },
        { name: 'numTrades', label: 'Number of Trades to Generate', type: 'number', placeholder: '50' },
    ],
    calculate: (i) => {
        const { winRate, avgWin, stdDevWin, avgLoss, stdDevLoss, numTrades } = i as { [key: string]: number };
        
        // Box-Muller transform for normal distribution
        const randomNormal = (mean: number, stdDev: number) => {
            let u1 = 0, u2 = 0;
            while (u1 === 0) u1 = Math.random();
            while (u2 === 0) u2 = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            return z * stdDev + mean;
        };
        
        const trades = [];
        for (let t = 0; t < numTrades; t++) {
            if (Math.random() < winRate / 100) {
                trades.push(randomNormal(avgWin, stdDevWin));
            } else {
                trades.push(-Math.abs(randomNormal(avgLoss, stdDevLoss)));
            }
        }
        
        const tradeString = trades.map(t => formatNumber(t, 2)).join(', ');

        return {
            label: 'Generated Trade P&L Series',
            value: tradeString,
        };
    },
};
