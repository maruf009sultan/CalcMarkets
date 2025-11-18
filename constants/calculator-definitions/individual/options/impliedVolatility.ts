import type { Calculator } from '../../../../types';
import { blackScholes, bisection, formatPercent } from '../../../../utils/helpers';

export const impliedVolatilityCalculator: Calculator = {
    id: 'implied-volatility',
    name: 'Implied Volatility',
    description: 'Calculate the market\'s expectation of future volatility from an option\'s price.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100' },
        { name: 'k', label: 'Strike Price', type: 'number', placeholder: '105' },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.25' },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
        { name: 'optionPrice', label: 'Market Option Price', type: 'number', placeholder: '2.50' },
        { name: 'optionType', label: 'Option Type (call/put)', type: 'text', placeholder: 'call' },
    ],
    calculate: (i) => {
        const { s, k, t, r, optionPrice } = i as { [key: string]: number };
        const type = (i.optionType as string).toLowerCase() as 'call' | 'put';
        if (type !== 'call' && type !== 'put') return { error: 'Option type must be "call" or "put".' };
        
        const priceFunction = (vol: number) => blackScholes(s, k, t, vol, r / 100, type);
        const iv = bisection(priceFunction, optionPrice, 0.001, 5.0, 1e-5, 100);

        if (iv >= 4.99) return { error: 'Could not converge. Check inputs or market price.' };
        return { label: 'Implied Volatility (IV)', value: formatPercent(iv), info: "The market's forecast of the likely movement in a security's price. It is derived from the option's market price." };
    },
};