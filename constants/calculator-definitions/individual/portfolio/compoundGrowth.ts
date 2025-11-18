import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const compoundGrowthCalculator: Calculator = {
    id: 'compound-growth',
    name: 'Compound Account Growth',
    description: 'Project the future value of an investment with regular contributions.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'currentSavings', label: 'Current Principal', type: 'number', placeholder: '10000' },
        { name: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', placeholder: '500' },
        { name: 'annualReturn', label: 'Expected Annual Return (%)', type: 'number', placeholder: '8' },
        { name: 'years', label: 'Years to Grow', type: 'number', placeholder: '10' },
    ],
    calculate: (i) => {
        const p = i.currentSavings as number;
        const pmt = i.monthlyContribution as number;
        const r = (i.annualReturn as number) / 100 / 12;
        const n = (i.years as number) * 12;

        if (r === 0) {
            return { label: 'Future Value', value: formatCurrency(p + pmt * n) };
        }

        const fv = p * Math.pow(1 + r, n) + pmt * ((Math.pow(1 + r, n) - 1) / r);
        const totalContributions = p + (pmt * n);
        const totalInterest = fv - totalContributions;

        return [
            { label: 'Future Value', value: formatCurrency(fv) },
            { label: 'Total Principal', value: formatCurrency(totalContributions) },
            { label: 'Total Interest Earned', value: formatCurrency(totalInterest) },
        ];
    }
};