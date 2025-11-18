import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber, formatPercent, parseSeries, mean, sum } from '../../../../utils/helpers';

export const multiTradeAnalyzerCalculator: Calculator = {
    id: 'multi-trade-analyzer',
    name: 'Multi-Trade Batch Analyzer',
    description: 'Analyze a series of trades to get key performance statistics.',
    category: 'Meta Calculators',
    inputs: [
        { name: 'trades', label: 'Trade P&L', type: 'textarea', placeholder: '150, -50, 200, 300, -75, 120', info: 'Comma-separated P&L for each trade' },
    ],
    calculate: (i) => {
        const trades = parseSeries(i.trades as string);
        if (trades.length === 0) return { error: 'No trades entered.' };
        
        const wins = trades.filter(t => t > 0);
        const losses = trades.filter(t => t < 0);
        
        const totalTrades = trades.length;
        const winRate = wins.length / totalTrades;
        const totalPnl = sum(trades);
        const avgWin = wins.length > 0 ? mean(wins) : 0;
        const avgLoss = losses.length > 0 ? Math.abs(mean(losses)) : 0;
        const profitFactor = avgLoss === 0 ? Infinity : (sum(wins) / Math.abs(sum(losses)));
        const expectancy = (winRate * avgWin) - ((1 - winRate) * avgLoss);
        
        return [
            { label: 'Total Net P&L', value: formatCurrency(totalPnl) },
            { label: 'Profit Factor', value: formatNumber(profitFactor) },
            { label: 'Win Rate', value: formatPercent(winRate) },
            { label: 'Expectancy per Trade', value: formatCurrency(expectancy) },
            { label: 'Average Win', value: formatCurrency(avgWin) },
            { label: 'Average Loss', value: formatCurrency(avgLoss) },
        ];
    }
};