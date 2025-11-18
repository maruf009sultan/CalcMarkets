import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const marginCalculator: Calculator = {
    id: 'margin',
    name: 'Margin',
    description: 'Calculate the amount of margin required to open a leveraged position.',
    category: 'Risk Management',
    inputs: [
        { name: 'positionValue', label: 'Total Position Value', type: 'number', placeholder: '10000' },
        { name: 'marginRequirement', label: 'Margin Requirement (%)', type: 'number', placeholder: '5' },
    ],
    calculate: (i) => {
        const requiredMargin = (i.positionValue as number) * ((i.marginRequirement as number) / 100);
        return { label: 'Required Margin', value: formatCurrency(requiredMargin) };
    },
};