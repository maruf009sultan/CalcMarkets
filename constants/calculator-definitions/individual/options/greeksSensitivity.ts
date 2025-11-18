import type { Calculator, CalculationResult } from '../../../../types';
import { calculateGreeks, formatCurrency, formatNumber } from '../../../../utils/helpers';

export const greeksSensitivityCalculator: Calculator = {
    id: 'greeks-sensitivity',
    name: 'Greeks Sensitivity Analyzer',
    description: 'Analyze how options greeks change with stock price and time.',
    category: 'Options',
    inputs: [
        { name: 's', label: 'Stock Price', type: 'number', placeholder: '100' },
        { name: 'k', label: 'Strike Price', type: 'number', placeholder: '100' },
        { name: 't', label: 'Time to Expiry (Years)', type: 'number', placeholder: '0.25' },
        { name: 'v', label: 'Volatility (%)', type: 'number', placeholder: '30' },
        { name: 'r', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '5' },
    ],
    calculate: (i): CalculationResult => {
        const { s, k, t, v, r } = i as { [key: string]: number };
        const headers = ['Stock Price', 'Call Delta', 'Put Delta', 'Gamma', 'Call Theta', 'Vega'];
        const rows = [];
        for (let price = s - 10; price <= s + 10; price += 2.5) {
            if (price <= 0) continue;
             const greeks = calculateGreeks(price, k, t, v/100, r/100);
             rows.push([
                formatCurrency(price), 
                formatNumber(greeks.deltaCall, 3), 
                formatNumber(greeks.deltaPut, 3), 
                formatNumber(greeks.gamma, 4), 
                formatNumber(greeks.thetaCall/365, 3), 
                formatNumber(greeks.vega/100, 3)
            ]);
        }
        return {
            label: 'Greeks Sensitivity to Stock Price',
            table: { headers, rows }
        };
    }
};
