import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const cagrCalculator: Calculator = {
    id: 'cagr',
    name: 'CAGR',
    description: 'Calculate the Compounded Annual Growth Rate of an investment.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'startValue', label: 'Beginning Value', type: 'number', placeholder: '10000' },
        { name: 'endValue', label: 'Ending Value', type: 'number', placeholder: '18000' },
        { name: 'years', label: 'Number of Years', type: 'number', placeholder: '5' },
    ],
    calculate: (i) => {
        const start = i.startValue as number;
        const end = i.endValue as number;
        const years = i.years as number;
        if (start <= 0 || years <= 0) return { error: "Beginning value and years must be positive." };
        const cagr = Math.pow(end / start, 1 / years) - 1;
        return { label: 'CAGR', value: formatPercent(cagr) };
    }
};