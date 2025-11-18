import type { Calculator, CalculationResult } from '../../../../types';
import { blackScholes, bisection, formatPercent, formatNumber } from '../../../../utils/helpers';

export const skewSmileCalculator: Calculator = {
    id: 'skew-smile-calculator',
    name: 'Skew & Smile Calculator',
    description: 'Calculate implied volatility for different strikes to visualize the volatility skew or smile.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100' },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.25' },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
        { name: 'options', label: 'Options Data (Strike,Price,Type)', type: 'textarea', placeholder: '90,10.50,call\n100,2.50,call\n110,0.50,call\n90,0.20,put\n100,2.20,put', info: 'One option per line: Strike, Market Price, Type (call/put)' },
    ],
    calculate: (i): CalculationResult => {
        const lines = (i.options as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length < 2) return { error: 'At least two option prices are needed to show a skew.' };
        const { s, t, r } = i as { [key: string]: number };
        
        const results = lines.map(line => {
            const parts = line.split(',');
            if (parts.length !== 3) throw new Error(`Invalid format: ${line}`);
            const strike = parseFloat(parts[0]);
            const price = parseFloat(parts[1]);
            const type = parts[2].toLowerCase() as 'call' | 'put';

            const priceFunction = (vol: number) => blackScholes(s, strike, t, vol, r / 100, type);
            const iv = bisection(priceFunction, price, 0.001, 5.0, 1e-5, 100);

            return { strike, iv };
        }).sort((a,b) => a.strike - b.strike);
        
        const headers = ['Strike Price', 'Moneyness (K/S)', 'Implied Volatility'];
        const rows = results.map(res => [
            formatNumber(res.strike, 2),
            formatNumber(res.strike / s, 2),
            formatPercent(res.iv)
        ]);
        
        return {
            label: 'Implied Volatility Skew/Smile',
            table: { headers, rows }
        };
    },
};
