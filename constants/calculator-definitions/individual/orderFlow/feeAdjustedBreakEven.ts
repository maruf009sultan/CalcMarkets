import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const feeAdjustedBreakEvenCalculator: Calculator = {
    id: 'fee-adjusted-break-even',
    name: 'Fee-Adjusted Break-Even',
    description: 'Calculate the true break-even price including commissions, slippage, and other fees.',
    category: 'Order Flow & Microstructure',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price per Share', type: 'number', placeholder: '50.00' },
        { name: 'quantity', label: 'Number of Shares', type: 'number', placeholder: '100' },
        { name: 'commission', label: 'Round-Trip Commission ($)', type: 'number', placeholder: '10.00', defaultValue: '0' },
        { name: 'slippage', label: 'Estimated Slippage per Share ($)', type: 'number', placeholder: '0.02', defaultValue: '0' },
        { name: 'otherFees', label: 'Other Fees ($)', type: 'number', placeholder: '1.50', defaultValue: '0' },
    ],
    calculate: (i) => {
        const { entryPrice, quantity, commission, slippage, otherFees } = i as { [key: string]: number };
        if (quantity <= 0) return { error: 'Quantity must be greater than zero.' };

        const totalFees = commission + (slippage * quantity) + otherFees;
        const feesPerShare = totalFees / quantity;
        const longBreakEven = entryPrice + feesPerShare;
        const shortBreakEven = entryPrice - feesPerShare;
        
        return [
            { label: 'Total Fees per Share', value: formatCurrency(feesPerShare) },
            { label: 'Break-Even (Long Trade)', value: formatCurrency(longBreakEven) },
            { label: 'Break-Even (Short Trade)', value: formatCurrency(shortBreakEven) },
        ];
    },
};
