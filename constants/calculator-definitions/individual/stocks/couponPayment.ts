import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const couponPaymentCalculator: Calculator = {
    id: 'coupon-payment',
    name: 'Coupon Payment',
    description: 'Calculate the periodic coupon payment from a bond.',
    category: 'Stocks & Bonds',
    inputs: [
        { name: 'faceValue', label: 'Bond Face Value (Par)', type: 'number', placeholder: '1000' },
        { name: 'couponRate', label: 'Annual Coupon Rate (%)', type: 'number', placeholder: '5' },
        { name: 'frequency', label: 'Payments per Year', type: 'number', placeholder: '2' },
    ],
    calculate: (i) => {
        const { faceValue, couponRate, frequency } = i as { [key: string]: number };
        if (frequency <= 0) return { error: 'Payment frequency must be positive.' };
        const payment = (faceValue * (couponRate / 100)) / frequency;
        return { label: 'Coupon Payment', value: formatCurrency(payment) };
    }
};