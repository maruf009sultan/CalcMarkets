import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const trinomialOptionsCalculator: Calculator = {
    id: 'trinomial-options',
    name: 'Trinomial Options Pricing',
    description: 'Price an American or European option using a trinomial tree model.',
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
        const u = Math.exp(vol * Math.sqrt(2 * dt));
        const d = 1 / u;
        const pu = Math.pow((Math.exp(rate * dt/2) - Math.exp(-vol * Math.sqrt(dt/2))) / (Math.exp(vol*Math.sqrt(dt/2)) - Math.exp(-vol*Math.sqrt(dt/2))), 2);
        const pd = Math.pow((Math.exp(vol * Math.sqrt(dt/2)) - Math.exp(rate*dt/2)) / (Math.exp(vol*Math.sqrt(dt/2)) - Math.exp(-vol*Math.sqrt(dt/2))), 2);
        const pm = 1 - pu - pd;

        const optionValues: number[] = new Array(2 * steps + 1);
        for (let i = 0; i <= 2 * steps; i++) {
            const stockPrice = s * Math.pow(u, steps - i);
            optionValues[i] = Math.max(0, stockPrice - k); // Call option payoff
        }
        
        for (let j = steps - 1; j >= 0; j--) {
            for(let i=0; i<=2*j; i++) {
                const stockPrice = s * Math.pow(u, j-i);
                const europeanValue = Math.exp(-rate*dt) * (pu * optionValues[i] + pm * optionValues[i+1] + pd * optionValues[i+2]);
                optionValues[i] = Math.max(stockPrice - k, europeanValue); // American option check
            }
        }
        return { label: 'American Call Price (Trinomial)', value: formatCurrency(optionValues[0]) };
    }
};
