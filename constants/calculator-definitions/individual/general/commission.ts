import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const commissionCalculator: Calculator = {
    id: 'commission-calculator',
    name: 'Commission',
    description: 'Calculate trading commission based on a percentage or fixed fee structure.',
    category: 'General Trading',
    inputs: [
        { name: 'tradeValue', label: 'Total Trade Value', type: 'number', placeholder: '10000' },
        { name: 'commissionRate', label: 'Commission Rate (%)', type: 'number', placeholder: '0.1', defaultValue: '' },
        { name: 'fixedFee', label: 'Fixed Fee ($)', type: 'number', placeholder: '5.00', defaultValue: '' },
    ],
    calculate: (i) => {
        const { tradeValue, commissionRate, fixedFee } = i as { [key: string]: number };
        const results = [];
        if (commissionRate > 0) {
             results.push({ label: 'Commission (Percentage)', value: formatCurrency(tradeValue * (commissionRate/100))});
        }
         if (fixedFee > 0) {
             results.push({ label: 'Commission (Fixed)', value: formatCurrency(fixedFee)});
        }
        if (results.length === 0) return { error: 'Enter a commission rate or a fixed fee.' };
        return results;
    },
};