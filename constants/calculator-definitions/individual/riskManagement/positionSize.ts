import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const positionSizeCalculator: Calculator = {
    id: 'position-size',
    name: 'Position Size',
    description: 'Determine the appropriate number of shares to buy based on your risk tolerance.',
    category: 'Risk Management',
    inputs: [
        { name: 'accountValue', label: 'Account Value', type: 'number', placeholder: '25000' },
        { name: 'riskPercentage', label: 'Risk per Trade (%)', type: 'number', placeholder: '2' },
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '50.00' },
        { name: 'stopLossPrice', label: 'Stop-Loss Price', type: 'number', placeholder: '48.50' },
    ],
    calculate: (i) => {
        const riskAmount = (i.accountValue as number) * ((i.riskPercentage as number) / 100);
        const riskPerShare = (i.entryPrice as number) - (i.stopLossPrice as number);
        if (riskPerShare <= 0) return { error: 'Stop-Loss Price must be less than Entry Price for a long trade.' };
        const positionSize = riskAmount / riskPerShare;
        return [
            { label: 'Max Risk Amount', value: formatCurrency(riskAmount) },
            { label: 'Position Size (Shares)', value: formatNumber(positionSize) },
            { label: 'Position Value', value: formatCurrency(positionSize * (i.entryPrice as number)) },
        ];
    },
};