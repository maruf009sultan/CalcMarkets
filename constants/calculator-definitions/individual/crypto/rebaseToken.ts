import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const rebaseTokenCalculator: Calculator = {
    id: 'rebase-token-calculator',
    name: 'Rebase Token Calculator',
    description: 'Project the value of your holdings in an elastic supply (rebase) token.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'initialTokens', label: 'Your Initial Token Amount', type: 'number', placeholder: '100' },
        { name: 'initialPrice', label: 'Initial Token Price (USD)', type: 'number', placeholder: '1.05' },
        { name: 'dailyRebaseRate', label: 'Average Daily Rebase Rate (%)', type: 'number', placeholder: '0.5' },
        { name: 'days', label: 'Number of Days', type: 'number', placeholder: '30' },
    ],
    calculate: (i) => {
        const { initialTokens, initialPrice, dailyRebaseRate, days } = i as { [key: string]: number };
        const rate = dailyRebaseRate / 100;

        const finalTokens = initialTokens * Math.pow(1 + rate, days);
        const finalValue = finalTokens * initialPrice; // Assuming price pegs to initial price

        return [
            { label: 'Final Token Amount', value: formatNumber(finalTokens, 6) },
            { label: 'Final Value (assuming stable price)', value: formatCurrency(finalValue) },
        ];
    },
};
