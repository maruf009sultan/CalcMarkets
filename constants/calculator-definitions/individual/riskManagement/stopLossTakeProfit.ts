import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const stopLossTakeProfitCalculator: Calculator = {
    id: 'stop-loss-take-profit',
    name: 'Stop-Loss & Take-Profit',
    description: 'Calculate SL/TP price levels based on percentage, price, or risk-reward.',
    category: 'Risk Management',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '100' },
        { name: 'riskRewardRatio', label: 'Risk-Reward Ratio (for TP)', type: 'number', placeholder: '3', info: 'e.g., 3 means 1:3 risk-reward' },
        { name: 'stopLossAmount', label: 'Stop Loss Amount ($)', type: 'number', placeholder: '5' },
    ],
    calculate: (i) => {
        const { entryPrice, riskRewardRatio, stopLossAmount } = i as { [key: string]: number };
        const longSL = entryPrice - stopLossAmount;
        const longTP = entryPrice + (stopLossAmount * riskRewardRatio);
        const shortSL = entryPrice + stopLossAmount;
        const shortTP = entryPrice - (stopLossAmount * riskRewardRatio);
        return [
            { label: 'Long Trade Stop-Loss', value: formatCurrency(longSL) },
            { label: 'Long Trade Take-Profit', value: formatCurrency(longTP) },
            { label: 'Short Trade Stop-Loss', value: formatCurrency(shortSL) },
            { label: 'Short Trade Take-Profit', value: formatCurrency(shortTP) },
        ];
    }
};