import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const kellyCriterionCalculator: Calculator = {
    id: 'kelly-criterion',
    name: 'Kelly Criterion',
    description: 'Determine the optimal size for a bet to maximize long-term growth.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'winProb', label: 'Win Probability (%)', type: 'number', placeholder: '60' },
        { name: 'winLossRatio', label: 'Win/Loss Ratio', type: 'number', placeholder: '1.5', info: 'Ratio of amount won to amount lost (e.g., 1.5 means you win $1.50 for every $1 risked)' },
    ],
    calculate: (i) => {
        const p = (i.winProb as number) / 100;
        const b = i.winLossRatio as number;
        if (b <= 0) return { error: "Win/Loss ratio must be positive." };
        const q = 1 - p;
        const kelly = (p * b - q) / b;
        return { label: 'Kelly Percentage', value: formatPercent(kelly > 0 ? kelly : 0) };
    },
};