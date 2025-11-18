import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const binomialOptionsCalculator: Calculator = {
    id: 'binomial-options',
    name: 'Binomial Options Pricing',
    description: 'Price an American option using a binomial tree model.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100' },
        { name: 'k', label: 'Strike Price', type: 'number', placeholder: '100' },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '1' },
        { name: 'v', label: 'Volatility (%)', type: 'number', placeholder: '20' },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
        { name: 'steps', label: 'Number of Steps', type: 'number', placeholder: '100' },
    ],
    calculate: (i) => {
        const { s, k, t, v, r, steps } = i as { [key: string]: number };
        const vol = v / 100, rate = r / 100;
        const dt = t / steps;
        const u = Math.exp(vol * Math.sqrt(dt));
        const d = 1/u;
        const p = (Math.exp(rate * dt) - d) / (u - d);

        const prices = Array(steps + 1).fill(0).map((_, i) => s * Math.pow(u, i) * Math.pow(d, steps - i));
        const callValues = prices.map(price => Math.max(0, price - k));

        for (let j = steps - 1; j >= 0; j--) {
            for (let i = 0; i <= j; i++) {
                const exerciseValue = Math.max(0, (s * Math.pow(u, i) * Math.pow(d, j - i)) - k);
                const holdValue = (p * callValues[i+1] + (1-p) * callValues[i]) * Math.exp(-rate * dt);
                callValues[i] = Math.max(exerciseValue, holdValue);
            }
        }
        return { label: 'American Call Price (Binomial)', value: formatCurrency(callValues[0]) };
    }
};
