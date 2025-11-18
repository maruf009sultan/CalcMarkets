import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const riskOfRuinCalculator: Calculator = {
    id: 'risk-of-ruin',
    name: 'Risk of Ruin',
    description: 'Calculate the probability of losing a specified percentage of your capital.',
    category: 'Risk Management',
    inputs: [
        { name: 'winRate', label: 'Win Rate (%)', type: 'number', placeholder: '55' },
        { name: 'avgWin', label: 'Average Win ($)', type: 'number', placeholder: '200' },
        { name: 'avgLoss', label: 'Average Loss ($)', type: 'number', placeholder: '150' },
        { name: 'riskPerTrade', label: 'Risk per Trade (%)', type: 'number', placeholder: '2' },
        { name: 'ruinLevel', label: 'Ruin Level (% of Capital)', type: 'number', placeholder: '20' },
    ],
    calculate: (i) => {
        const p = (i.winRate as number) / 100;
        const w = i.avgWin as number;
        const l = i.avgLoss as number;
        const risk = (i.riskPerTrade as number) / 100;
        const ruin = (i.ruinLevel as number) / 100;
        
        const expectancy = p * w - (1 - p) * l;
        if (expectancy <= 0) return { label: 'Risk of Ruin', value: '100% (Negative Expectancy)' };

        const z = (ruin / risk) * (2 * expectancy / (w + l));
        const ror = Math.exp(-z);

        return { label: `Risk of Ruin (${i.ruinLevel}%)`, value: formatPercent(ror) };
    }
};