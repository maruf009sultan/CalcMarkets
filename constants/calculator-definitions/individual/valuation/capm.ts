import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const capmCalculator: Calculator = {
    id: 'capm',
    name: 'Capital Asset Pricing Model (CAPM)',
    description: 'Calculate the expected return of an investment based on its systematic risk (beta).',
    category: 'Investment Valuation',
    inputs: [
        { name: 'riskFreeRate', label: 'Risk-Free Rate (%)', type: 'number', placeholder: '3' },
        { name: 'marketReturn', label: 'Expected Market Return (%)', type: 'number', placeholder: '8' },
        { name: 'beta', label: 'Asset Beta', type: 'number', placeholder: '1.2' },
    ],
    calculate: (i) => {
        const rf = (i.riskFreeRate as number) / 100;
        const rm = (i.marketReturn as number) / 100;
        const beta = i.beta as number;
        const expectedReturn = rf + beta * (rm - rf);
        return { label: 'Expected Return (CAPM)', value: formatPercent(expectedReturn) };
    }
};