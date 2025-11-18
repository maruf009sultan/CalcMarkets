import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const optimalStopLossAtrCalculator: Calculator = {
    id: 'optimal-stop-loss-atr',
    name: 'Optimal Stop-Loss (ATR)',
    description: 'Calculate a volatility-based stop-loss using the Average True Range (ATR).',
    category: 'Risk Management',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '100' },
        { name: 'atr', label: 'Current ATR Value', type: 'number', placeholder: '2.5' },
        { name: 'multiplier', label: 'ATR Multiplier', type: 'number', placeholder: '2' },
    ],
    calculate: (i) => {
        const { entryPrice, atr, multiplier } = i as { [key: string]: number };
        const stopDistance = atr * multiplier;
        return [
            { label: 'Stop-Loss for Long Trade', value: formatCurrency(entryPrice - stopDistance) },
            { label: 'Stop-Loss for Short Trade', value: formatCurrency(entryPrice + stopDistance) },
        ];
    }
};