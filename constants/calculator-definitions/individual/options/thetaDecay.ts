import type { Calculator } from '../../../../types';
import { calculateGreeks, formatCurrency } from '../../../../utils/helpers';

export const thetaDecayCalculator: Calculator = {
    id: 'theta-decay',
    name: 'Time Value Decay (Theta)',
    description: 'Calculate the expected decay in an option\'s price over one day.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100' },
        { name: 'k', label: 'Strike Price', type: 'number', placeholder: '105' },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.25' },
        { name: 'v', label: 'Volatility (%)', type: 'number', placeholder: '20' },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
    ],
    calculate: (i) => {
        const S = i.s as number, K = i.k as number, T = i.t as number, v = (i.v as number) / 100, r = (i.r as number) / 100;
        const { thetaCall, thetaPut } = calculateGreeks(S, K, T, v, r);
        return [
            { label: 'Call Theta (per day)', value: formatCurrency(thetaCall / 365) },
            { label: 'Put Theta (per day)', value: formatCurrency(thetaPut / 365) },
        ];
    }
};
