import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const trailingStopCalculator: Calculator = {
    id: 'trailing-stop',
    name: 'Trailing Stop',
    description: 'Calculate trailing stop-loss price based on a percentage or fixed amount.',
    category: 'Risk Management',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '100' },
        { name: 'currentPrice', label: 'Current Highest Price (for Long)', type: 'number', placeholder: '110' },
        { name: 'trailingAmount', label: 'Trailing Amount ($)', type: 'number', placeholder: '5', defaultValue: '' },
        { name: 'trailingPercent', label: 'Trailing Percentage (%)', type: 'number', placeholder: '5', defaultValue: '' },
    ],
    calculate: (i) => {
        const { currentPrice, trailingAmount, trailingPercent } = i as { [key: string]: number };
        if (!trailingAmount && !trailingPercent) return { error: 'Enter either a trailing amount or percentage.' };
        
        const results = [];
        if (trailingAmount > 0) {
            results.push({ label: 'Stop Price (Fixed Amount)', value: formatCurrency(currentPrice - trailingAmount) });
        }
        if (trailingPercent > 0) {
            results.push({ label: 'Stop Price (Percentage)', value: formatCurrency(currentPrice * (1 - trailingPercent / 100)) });
        }
        return results;
    }
};