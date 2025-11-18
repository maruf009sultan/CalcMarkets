import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent, mean } from '../../../../utils/helpers';

export const tradeOutcomeSimulatorCalculator: Calculator = {
    id: 'trade-outcome-simulator',
    name: 'Trade Outcome Simulator (Monte Carlo)',
    description: 'Simulate potential equity curves based on your trading strategy inputs.',
    category: 'Meta Calculators',
    inputs: [
        { name: 'initialCapital', label: 'Initial Capital', type: 'number', placeholder: '10000' },
        { name: 'winRate', label: 'Win Rate (%)', type: 'number', placeholder: '55' },
        { name: 'avgWin', label: 'Average Win ($)', type: 'number', placeholder: '250' },
        { name: 'avgLoss', label: 'Average Loss ($)', type: 'number', placeholder: '150' },
        { name: 'numTrades', label: 'Number of Trades', type: 'number', placeholder: '100' },
        { name: 'numSims', label: 'Number of Simulations', type: 'number', placeholder: '20', defaultValue: '20' },
    ],
    calculate: (i) => {
        const { initialCapital, winRate, avgWin, avgLoss, numTrades, numSims } = i as { [key: string]: number };
        const pWin = winRate / 100;
        const finalEquities = [];

        for (let s = 0; s < numSims; s++) {
            let equity = initialCapital;
            for (let t = 0; t < numTrades; t++) {
                if (Math.random() < pWin) {
                    equity += avgWin;
                } else {
                    equity -= avgLoss;
                }
                if (equity <= 0) {
                    equity = 0;
                    break;
                }
            }
            finalEquities.push(equity);
        }
        
        const avgFinalEquity = mean(finalEquities);
        const maxEquity = Math.max(...finalEquities);
        const minEquity = Math.min(...finalEquities);
        const probOfProfit = finalEquities.filter(e => e > initialCapital).length / numSims;
        const probOfLoss = finalEquities.filter(e => e < initialCapital).length / numSims;
        
        return [
            { label: 'Average Final Equity', value: formatCurrency(avgFinalEquity) },
            { label: 'Best Case Equity', value: formatCurrency(maxEquity) },
            { label: 'Worst Case Equity', value: formatCurrency(minEquity) },
            { label: 'Probability of Profit', value: formatPercent(probOfProfit) },
            { label: 'Probability of Loss', value: formatPercent(probOfLoss) },
        ];
    }
};