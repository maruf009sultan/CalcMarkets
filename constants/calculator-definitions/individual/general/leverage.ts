import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const leverageCalculator: Calculator = {
    id: 'leverage-calculator',
    name: 'Leverage',
    description: 'Calculate the effective leverage and total exposure of a trade.',
    category: 'General Trading',
    inputs: [
        { name: 'positionValue', label: 'Total Position Value', type: 'number', placeholder: '50000' },
        { name: 'equity', label: 'Your Equity (Margin)', type: 'number', placeholder: '5000' },
    ],
    calculate: (i) => {
        const { positionValue, equity } = i as { [key: string]: number };
        if (equity <= 0) return { error: 'Equity must be positive.' };
        const leverage = positionValue / equity;
        return { label: 'Leverage Ratio', value: `${formatNumber(leverage)} : 1` };
    },
};