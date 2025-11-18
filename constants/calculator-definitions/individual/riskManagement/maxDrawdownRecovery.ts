import type { Calculator } from '../../../../types';
import { formatNumber, formatPercent } from '../../../../utils/helpers';

export const maxDrawdownRecoveryCalculator: Calculator = {
    id: 'max-drawdown-recovery',
    name: 'Max Drawdown Recovery Time',
    description: 'Estimate the time needed to recover from a maximum drawdown.',
    category: 'Risk Management',
    inputs: [
        { name: 'maxDrawdown', label: 'Maximum Drawdown (%)', type: 'number', placeholder: '25' },
        { name: 'annualReturn', label: 'Expected Annual Return (%)', type: 'number', placeholder: '15' },
    ],
    calculate: (i) => {
        const dd = (i.maxDrawdown as number) / 100;
        const r = (i.annualReturn as number) / 100;
        if (r <= 0) return { error: 'Annual return must be positive to recover.' };
        const gainNeeded = dd / (1 - dd);
        const years = Math.log(1 / (1 - dd)) / Math.log(1 + r);
        return [
            { label: 'Gain Needed to Recover', value: formatPercent(gainNeeded) },
            { label: 'Estimated Years to Recover', value: formatNumber(years, 2) },
        ];
    }
};