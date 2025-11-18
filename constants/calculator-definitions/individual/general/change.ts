import type { Calculator } from '../../../../types';
import { formatNumber, formatPercent } from '../../../../utils/helpers';

export const changeCalculator: Calculator = {
    id: 'change-calculator',
    name: 'Change',
    description: 'Calculate the absolute and percentage change between two values.',
    category: 'General Trading',
    inputs: [
        { name: 'initialPrice', label: 'Initial Price', type: 'number', placeholder: '200' },
        { name: 'finalPrice', label: 'Final Price', type: 'number', placeholder: '210' },
    ],
    calculate: (i) => {
        const initial = i.initialPrice as number;
        const final = i.finalPrice as number;
        if (initial === 0) return { error: 'Initial Price cannot be zero for percentage calculation.' };
        const absoluteChange = final - initial;
        const percentageChange = (absoluteChange / initial);
        return [
            { label: 'Absolute Change', value: formatNumber(absoluteChange) },
            { label: 'Percentage Change', value: formatPercent(percentageChange) },
        ];
    },
};