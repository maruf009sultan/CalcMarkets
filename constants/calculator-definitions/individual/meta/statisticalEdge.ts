import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const statisticalEdgeCalculator: Calculator = {
    id: 'statistical-edge',
    name: 'Statistical Edge (Expectancy)',
    description: 'Calculate the expectancy of your trading strategy to determine its long-term viability.',
    category: 'Meta Calculators',
    inputs: [
        { name: 'winRate', label: 'Win Rate (%)', type: 'number', placeholder: '60' },
        { name: 'avgWin', label: 'Average Win ($)', type: 'number', placeholder: '500' },
        { name: 'lossRate', label: 'Loss Rate (%)', type: 'number', placeholder: '40' },
        { name: 'avgLoss', label: 'Average Loss ($)', type: 'number', placeholder: '300' },
    ],
    calculate: (i) => {
        const { winRate, avgWin, lossRate, avgLoss } = i as { [key: string]: number };
        if (winRate + lossRate !== 100) return { error: 'Win Rate and Loss Rate must sum to 100%.' };
        
        const expectancy = ((winRate / 100) * avgWin) - ((lossRate / 100) * avgLoss);
        
        return [
            { label: 'Expectancy per Trade', value: formatCurrency(expectancy) },
            { label: 'Edge', value: expectancy > 0 ? 'Positive Edge (Favorable)' : 'Negative Edge (Unfavorable)' },
        ];
    }
};