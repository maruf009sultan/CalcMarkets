import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const putCallParityCalculator: Calculator = {
    id: 'put-call-parity',
    name: 'Put-Call Parity Calculator',
    description: 'Check for arbitrage opportunities using the put-call parity relationship.',
    category: 'Options',
    inputs: [
        { name: 'callPrice', label: 'Call Price', type: 'number', placeholder: '7.50' },
        { name: 'putPrice', label: 'Put Price', type: 'number', placeholder: '5.00' },
        { name: 'stockPrice', label: 'Underlying Stock Price', type: 'number', placeholder: '100' },
        { name: 'strikePrice', label: 'Strike Price', type: 'number', placeholder: '100' },
        { name: 'time', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.5' },
        { name: 'riskFreeRate', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
    ],
    calculate: (i) => {
        const { callPrice, putPrice, stockPrice, strikePrice, time, riskFreeRate } = i as { [key: string]: number };
        const r = riskFreeRate / 100;
        
        const leftSide = callPrice + strikePrice * Math.exp(-r * time);
        const rightSide = putPrice + stockPrice;
        
        const difference = leftSide - rightSide;
        let conclusion = "Prices are consistent with Put-Call Parity.";
        if (Math.abs(difference) > 0.01) { // Allow for small rounding errors
            conclusion = `Arbitrage opportunity may exist. Difference: ${formatCurrency(difference)}.`;
        }

        return [
            { label: 'Call Side (C + K*e^-rt)', value: formatCurrency(leftSide) },
            { label: 'Put Side (P + S)', value: formatCurrency(rightSide) },
            { label: 'Conclusion', value: conclusion, info: "Put-Call Parity is a no-arbitrage principle stating that a portfolio of a long call and a short put must equal a forward contract on the underlying stock." },
        ];
    },
};