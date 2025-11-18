import type { Calculator } from '../../../../types';
import { cdf, formatPercent } from '../../../../utils/helpers';

export const assignmentProbabilityCalculator: Calculator = {
    id: 'assignment-probability',
    name: 'Options Assignment Probability',
    description: 'Estimate the probability of an option being assigned (expiring in-the-money).',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100' },
        { name: 'k', label: 'Strike Price', type: 'number', placeholder: '105' },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.25' },
        { name: 'v', label: 'Volatility (%)', type: 'number', placeholder: '20' },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
    ],
    calculate: (i) => {
        const { s, k, t, v, r } = i as { [key: string]: number };
        const vol = v / 100, rate = r / 100;
        const d2 = (Math.log(s / k) + (rate - vol * vol / 2) * t) / (vol * Math.sqrt(t));

        const callProb = cdf(d2);
        const putProb = cdf(-d2);
        
        return [
            { label: 'Call ITM Probability', value: formatPercent(callProb) },
            { label: 'Put ITM Probability', value: formatPercent(putProb) },
        ];
    }
};
