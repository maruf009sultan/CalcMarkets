import type { Calculator, CalculationResult } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const positionHeatmapCalculator: Calculator = {
    id: 'position-heatmap',
    name: 'Position Heatmap',
    description: 'Visualize P&L across a range of stop-loss and take-profit outcomes.',
    category: 'Backtesting & Strategy Engineering',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '100' },
        { name: 'quantity', label: 'Quantity', type: 'number', placeholder: '100' },
        { name: 'slStart', label: 'Stop-Loss Start ($)', type: 'number', placeholder: '98' },
        { name: 'slEnd', label: 'Stop-Loss End ($)', type: 'number', placeholder: '95' },
        { name: 'tpStart', label: 'Take-Profit Start ($)', type: 'number', placeholder: '102' },
        { name: 'tpEnd', label: 'Take-Profit End ($)', type: 'number', placeholder: '105' },
        { name: 'steps', label: 'Number of Steps', type: 'number', placeholder: '4', defaultValue: '4' },
    ],
    calculate: (i): CalculationResult => {
        const { entryPrice, quantity, slStart, slEnd, tpStart, tpEnd, steps } = i as { [key: string]: number };
        const slStep = (slEnd - slStart) / (steps - 1);
        const tpStep = (tpEnd - tpStart) / (steps - 1);
        
        const slLevels = Array.from({ length: steps }, (_, j) => slStart + j * slStep);
        const tpLevels = Array.from({ length: steps }, (_, j) => tpStart + j * tpStep);

        const headers = ['Stop \\ Profit'].concat(tpLevels.map(l => formatCurrency(l)));
        const rows = slLevels.map(sl => {
            const row = [formatCurrency(sl)];
            tpLevels.forEach(tp => {
                const risk = entryPrice - sl;
                const reward = tp - entryPrice;
                const ratio = reward / risk;
                row.push(`${formatCurrency(reward * quantity)} (1:${ratio.toFixed(1)})`);
            });
            return row;
        });

        return {
            label: 'P&L / Risk-Reward Heatmap',
            table: { headers, rows }
        };
    },
};
