import type { Calculator } from '../../../../types';
import { formatNumber, calculateGreeks } from '../../../../utils/helpers';

export const optionsGreeksCalculator: Calculator = {
    id: 'options-greeks',
    name: 'Options Greeks (1st & 2nd Order)',
    description: 'Calculate primary (Delta, Gamma, Theta, Vega) and secondary (Vanna, Charm) greeks.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100', info: "Current market price of the underlying asset." },
        { name: 'k', label: 'Strike Price', type: 'number', placeholder: '105', info: "The price at which the option can be exercised." },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.25', info: "Time remaining until the option expires, expressed in years." },
        { name: 'v', label: 'Volatility (%)', type: 'number', placeholder: '20', info: "The implied volatility of the underlying asset." },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5', info: "The annualized risk-free interest rate." },
    ],
    calculate: (i) => {
        const S = i.s as number, K = i.k as number, T = i.t as number, v = (i.v as number) / 100, r = (i.r as number) / 100;
         if (S <= 0 || K <= 0 || T <= 0 || v <= 0) return { error: "Inputs must be positive."};

        const greeks = calculateGreeks(S, K, T, v, r);

        return [
            { label: 'Call Delta', value: formatNumber(greeks.deltaCall, 4), info: "Rate of change of the option's price for a $1 change in the stock. Ranges from 0 to 1 for calls." },
            { label: 'Put Delta', value: formatNumber(greeks.deltaPut, 4), info: "Rate of change of the option's price for a $1 change in the stock. Ranges from -1 to 0 for puts." },
            { label: 'Gamma', value: formatNumber(greeks.gamma, 4), info: "Rate of change of Delta for a $1 change in the stock. Measures the convexity of the option's value." },
            { label: 'Call Theta (per day)', value: formatNumber(greeks.thetaCall / 365, 4), info: "Rate of change of the option's price per day due to time decay." },
            { label: 'Vega (per 1% vol change)', value: formatNumber(greeks.vega / 100, 4), info: "Rate of change of the option's price for a 1% change in implied volatility." },
            { label: 'Vanna', value: formatNumber(greeks.vanna, 4), info: "Measures the change in Delta with respect to a change in volatility." },
            { label: 'Charm (per day)', value: formatNumber(greeks.charm / 365, 4), info: "Measures the change in Delta per day due to time decay. Also known as Delta Decay." },
        ];
    },
};