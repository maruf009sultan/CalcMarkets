import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const optionsArbitrageCheckerCalculator: Calculator = {
    id: 'options-arbitrage-checker',
    name: 'Options Arbitrage Checker',
    description: 'Check for butterfly, box, and conversion/reversal arbitrage opportunities.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100' },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.25' },
        { name: 'strikesAndPrices', label: 'Options (Strike,Call,Put)', type: 'textarea', placeholder: '95,6.50,1.20\n100,2.80,2.50\n105,0.90,5.50', info: 'One strike per line: Strike, Call Price, Put Price' },
    ],
    calculate: (i) => {
        const lines = (i.strikesAndPrices as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length < 3) return { error: 'At least 3 strikes are needed for butterfly/box spreads.' };
        const { s, r, t } = i as { [key: string]: number };
        
        const options = lines.map(line => {
            const [k, c, p] = line.split(',').map(parseFloat);
            return { k, c, p };
        }).sort((a,b) => a.k - b.k);
        
        const k1 = options[0], k2 = options[1], k3 = options[2];

        // Butterfly Arbitrage Check
        const flyCost = k1.c - 2 * k2.c + k3.c;
        if (flyCost < 0) {
            return { label: 'Arbitrage Found: Butterfly Spread', value: `Buy 1 C(${k1.k}), Sell 2 C(${k2.k}), Buy 1 C(${k3.k}) for a credit of ${formatCurrency(-flyCost)}.` };
        }
        
        // Box Spread Arbitrage Check
        const boxValue = (k2.c - k2.p) - (k1.c - k1.p);
        const expectedValue = (k2.k - k1.k) * Math.exp(-r/100 * t);
        if (boxValue < expectedValue) {
             return { label: 'Arbitrage Found: Box Spread', value: `Profit of ${formatCurrency(expectedValue - boxValue)} per spread.` };
        }

        // Conversion/Reversal
        const syntheticStock = k2.c - k2.p;
        const expectedSynth = s - k2.k * Math.exp(-r/100 * t);
        if (Math.abs(syntheticStock - expectedSynth) > 0.1) { // Allow tolerance
            return { label: 'Arbitrage Found: Conversion/Reversal', value: `Synthetic stock priced at ${formatCurrency(syntheticStock)} vs expected ${formatCurrency(expectedSynth)}.` };
        }
        
        return { label: 'Result', value: 'No obvious arbitrage opportunities detected among the provided options.' };
    },
};
