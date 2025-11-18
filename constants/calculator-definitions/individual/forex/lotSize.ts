import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const lotSizeCalculator: Calculator = {
    id: 'lot-size',
    name: 'Lot Size',
    description: 'Calculate the appropriate Forex lot size based on account risk.',
    category: 'Forex & Futures',
    inputs: [
        { name: 'accountBalance', label: 'Account Balance', type: 'number', placeholder: '10000' },
        { name: 'riskPercentage', label: 'Risk per Trade (%)', type: 'number', placeholder: '1.5' },
        { name: 'stopLossPips', label: 'Stop Loss (Pips)', type: 'number', placeholder: '50' },
        { name: 'pipValue', label: 'Pip Value per Standard Lot', type: 'number', placeholder: '10' },
    ],
    calculate: (i) => {
        const slPips = i.stopLossPips as number;
        const pipValue = i.pipValue as number;
        if (slPips <= 0 || pipValue <= 0) return { error: 'Stop Loss and Pip Value must be positive.' };
        const riskAmount = (i.accountBalance as number) * ((i.riskPercentage as number) / 100);
        const lotSize = riskAmount / (slPips * pipValue);
        return [
            { label: 'Risk Amount', value: formatCurrency(riskAmount) },
            { label: 'Lot Size', value: formatNumber(lotSize, 2) },
            { label: 'Units', value: formatNumber(lotSize * 100000, 0) },
        ];
    },
};