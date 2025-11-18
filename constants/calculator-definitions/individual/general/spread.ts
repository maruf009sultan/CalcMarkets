import type { Calculator } from '../../../../types';
import { formatNumber, formatPercent } from '../../../../utils/helpers';

export const spreadCalculator: Calculator = {
    id: 'spread-calculator',
    name: 'Spread',
    description: 'Calculate the bid-ask spread in absolute and percentage terms.',
    category: 'General Trading',
    inputs: [
        { name: 'askPrice', label: 'Ask Price', type: 'number', placeholder: '1.0855' },
        { name: 'bidPrice', label: 'Bid Price', type: 'number', placeholder: '1.0853' },
    ],
    calculate: (i) => {
        const { askPrice, bidPrice } = i as { [key: string]: number };
        if (bidPrice > askPrice) return { error: 'Bid price cannot be higher than ask price.' };
        const spread = askPrice - bidPrice;
        const percentage = (spread / askPrice);
        return [
            { label: 'Spread', value: formatNumber(spread, 5) },
            { label: 'Spread Percentage', value: formatPercent(percentage) },
        ];
    },
};