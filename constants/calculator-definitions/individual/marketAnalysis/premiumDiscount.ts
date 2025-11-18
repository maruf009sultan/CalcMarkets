import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const premiumDiscountCalculator: Calculator = {
    id: 'premium-discount',
    name: 'Premium/Discount Market',
    description: 'Determine if the current price is in a premium or discount zone of a given range.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'rangeHigh', label: 'Range High', type: 'number', placeholder: '200' },
        { name: 'rangeLow', label: 'Range Low', type: 'number', placeholder: '150' },
        { name: 'currentPrice', label: 'Current Price', type: 'number', placeholder: '185' },
    ],
    calculate: (i) => {
        const { rangeHigh, rangeLow, currentPrice } = i as { [key: string]: number };
        if (rangeLow >= rangeHigh) return { error: 'Range Low must be less than Range High.' };
        const equilibrium = (rangeHigh + rangeLow) / 2;
        let status = 'Premium (expensive)';
        if (currentPrice < equilibrium) status = 'Discount (cheap)';
        if (currentPrice === equilibrium) status = 'Equilibrium';
        return [
            { label: 'Equilibrium Price (50%)', value: formatNumber(equilibrium) },
            { label: 'Current Market State', value: status },
        ];
    },
};