import type { Calculator } from '../../../../types';
import { formatNumber, formatPercent } from '../../../../utils/helpers';

export const tokenEmissionsCalculator: Calculator = {
    id: 'token-emissions',
    name: 'Token Emissions / Inflation',
    description: 'Project the future supply and inflation rate of a token.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'currentSupply', label: 'Current Token Supply', type: 'number', placeholder: '100000000' },
        { name: 'emissionRate', label: 'Emission Rate (Tokens per day)', type: 'number', placeholder: '50000' },
        { name: 'days', label: 'Days to Project', type: 'number', placeholder: '365' },
    ],
    calculate: (i) => {
        const { currentSupply, emissionRate, days } = i as { [key: string]: number };
        const futureSupply = currentSupply + (emissionRate * days);
        const inflation = (futureSupply / currentSupply) - 1;
        const annualizedInflation = Math.pow(1 + inflation, 365 / days) - 1;
        return [
            { label: 'Future Supply', value: formatNumber(futureSupply, 0) },
            { label: `Inflation over ${days} days`, value: formatPercent(inflation) },
            { label: 'Annualized Inflation Rate', value: formatPercent(annualizedInflation) },
        ];
    }
};