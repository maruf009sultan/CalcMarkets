import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent } from '../../../../utils/helpers';

export const portfolioRebalancingCalculator: Calculator = {
    id: 'portfolio-rebalancing',
    name: 'Portfolio Rebalancing',
    description: 'Calculate the trades needed to return a portfolio to its target allocation.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'assets', label: 'Assets (Ticker,Current Value,Target %)', type: 'textarea', placeholder: 'SPY,50000,60\nAGG,30000,40\nGLD,20000,0', info: 'One asset per line: Ticker, Current Value, Target Allocation %' },
    ],
    calculate: (i) => {
        const lines = (i.assets as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No assets entered.' };

        const assets = lines.map(line => {
            const parts = line.split(',');
            if (parts.length !== 3) throw new Error(`Invalid format: ${line}`);
            return { ticker: parts[0].trim(), value: parseFloat(parts[1]), target: parseFloat(parts[2]) / 100 };
        });

        const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
        const totalTarget = assets.reduce((sum, asset) => sum + asset.target, 0);
        if (Math.abs(totalTarget - 1) > 0.001) return { error: `Total target allocation must be 100%. Current: ${formatPercent(totalTarget)}`};
        
        const headers = ['Ticker', 'Current Value', 'Target Value', 'Action', 'Amount'];
        const rows = assets.map(asset => {
            const targetValue = totalValue * asset.target;
            const difference = targetValue - asset.value;
            const action = difference > 0 ? 'BUY' : 'SELL';
            return [asset.ticker, formatCurrency(asset.value), formatCurrency(targetValue), action, formatCurrency(Math.abs(difference))];
        });

        return {
            label: 'Rebalancing Plan',
            table: { headers, rows }
        }
    }
};