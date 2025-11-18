import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const defiApyCalculator: Calculator = {
    id: 'defi-apy',
    name: 'DeFi Lending/Borrowing APY',
    description: 'Calculate the effective APY from an APR with periodic compounding.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'apr', label: 'Stated APR (%)', type: 'number', placeholder: '10' },
        { name: 'compounds', label: 'Compounds per Year', type: 'number', placeholder: '365' },
    ],
    calculate: (i) => {
        const apr = (i.apr as number) / 100;
        const n = i.compounds as number;
        const apy = Math.pow(1 + apr / n, n) - 1;
        return { label: 'Effective APY', value: formatPercent(apy) };
    }
};