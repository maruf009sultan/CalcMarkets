import type { Calculator } from '../../../../types';
import { calculateGreeks, formatCurrency } from '../../../../utils/helpers';

export const gexCalculator: Calculator = {
    id: 'gex',
    name: 'Gamma Exposure (GEX)',
    description: 'Estimate the market-wide gamma exposure from options positions.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100' },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.1' },
        { name: 'v', label: 'Volatility (%)', type: 'number', placeholder: '25' },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
        { name: 'positions', label: 'Positions (Strike,Call OI,Put OI)', type: 'textarea', placeholder: '95,1000,500\n100,5000,2000\n105,800,1500', info: 'Strike, Call Open Interest, Put Open Interest per line.' },
    ],
    calculate: (i) => {
        const lines = (i.positions as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No positions entered.' };
        const { s, t, v, r } = i as { [key: string]: number };

        let totalGEX = 0;
        for(const line of lines) {
            const parts = line.split(',');
            if (parts.length !== 3) throw new Error(`Invalid format: ${line}`);
            const strike = parseFloat(parts[0]);
            const callOI = parseFloat(parts[1]);
            const putOI = parseFloat(parts[2]);

            const gamma = calculateGreeks(s, strike, t, v/100, r/100).gamma;
            const gex = gamma * (callOI - putOI) * 100 * s * s * 0.01;
            totalGEX += gex;
        }

        return { label: 'Total GEX (per 1% move)', value: formatCurrency(totalGEX), info: "Gamma Exposure. Estimates the total dollar value of gamma in the market. A large positive GEX can suppress volatility, while a large negative GEX can amplify it." };
    }
};