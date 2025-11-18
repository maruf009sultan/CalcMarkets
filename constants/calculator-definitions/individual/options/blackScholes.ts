import type { Calculator } from '../../../../types';
import { blackScholes, formatCurrency } from '../../../../utils/helpers';

export const blackScholesCalculator: Calculator = {
    id: 'black-scholes',
    name: 'Black-Scholes Options Pricing',
    description: 'Calculate the theoretical price of European-style options.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100', info: "Current market price of the underlying asset." },
        { name: 'k', label: 'Strike Price', type: 'number', placeholder: '105', info: "The price at which the option can be exercised." },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.25', info: "Time remaining until the option expires, expressed in years (e.g., 3 months = 0.25)." },
        { name: 'v', label: 'Volatility (%)', type: 'number', placeholder: '20', info: "The annualized standard deviation of the stock's returns, known as implied volatility." },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5', info: "The annualized risk-free interest rate (e.g., the yield on a short-term government bond)." },
    ],
    calculate: (i) => {
        const { s, k, t, v, r } = i as { [key: string]: number };
        const callPrice = blackScholes(s, k, t, v / 100, r / 100, 'call');
        const putPrice = blackScholes(s, k, t, v / 100, r / 100, 'put');
        return [
            { label: 'Call Option Price', value: formatCurrency(callPrice), info: "The theoretical fair value of the call option, assuming a European-style exercise." },
            { label: 'Put Option Price', value: formatCurrency(putPrice), info: "The theoretical fair value of the put option, assuming a European-style exercise." },
        ];
    },
};