import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const riskNeutralProbabilityCalculator: Calculator = {
    id: 'risk-neutral-probability',
    name: 'Risk-Neutral Probability',
    description: 'Calculate the risk-neutral probability of an up-move in a binomial model.',
    category: 'Options',
    inputs: [
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
        { name: 't', label: 'Time per Step (Years)', type: 'number', placeholder: '0.25', info: 'e.g., For 3 months, use 0.25' },
        { name: 'v', label: 'Volatility (%)', type: 'number', placeholder: '30' },
    ],
    calculate: (i) => {
        const rate = (i.r as number) / 100;
        const dt = i.t as number;
        const vol = (i.v as number) / 100;

        if (dt <= 0 || vol <= 0) {
            return { error: 'Time and Volatility must be positive.' };
        }
        
        const u = Math.exp(vol * Math.sqrt(dt)); // Up-factor
        const d = 1 / u; // Down-factor

        const p = (Math.exp(rate * dt) - d) / (u - d);

        if (p < 0 || p > 1) {
            return { error: 'Arbitrage opportunity detected. Check inputs.' };
        }

        return [
            { label: 'Probability of Up Move (p)', value: formatPercent(p) },
            { label: 'Probability of Down Move (1-p)', value: formatPercent(1 - p) },
        ];
    },
};
