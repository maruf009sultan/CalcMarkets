import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const kellyFractionCalculator: Calculator = {
    id: 'kelly-fraction',
    name: 'Kelly Criterion (Fractional)',
    description: 'Determine the optimal position size, with an option for fractional Kelly betting.',
    category: 'Risk Management',
    inputs: [
        { name: 'winProb', label: 'Win Probability (%)', type: 'number', placeholder: '60' },
        { name: 'winLossRatio', label: 'Win/Loss Ratio', type: 'number', placeholder: '1.5', info: 'Ratio of amount won to amount lost' },
        { name: 'fraction', label: 'Kelly Fraction', type: 'number', placeholder: '0.5', defaultValue: '1', info: 'e.g., 0.5 for half-Kelly' },
    ],
    calculate: (i) => {
        const p = (i.winProb as number) / 100;
        const b = i.winLossRatio as number;
        const f = i.fraction as number;
        if (b <= 0) return { error: "Win/Loss ratio must be positive." };
        if (f <=0 || f > 1) return { error: "Fraction must be between 0 and 1." };
        const q = 1 - p;
        const kelly = (p * b - q) / b;
        const kellyFraction = (kelly > 0 ? kelly : 0) * f;
        return [
            { label: 'Full Kelly Percentage', value: formatPercent(kelly > 0 ? kelly : 0) },
            { label: `Fractional Kelly (${f*100}%)`, value: formatPercent(kellyFraction) },
        ];
    },
};