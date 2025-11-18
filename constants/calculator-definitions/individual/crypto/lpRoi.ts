import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const lpRoiCalculator: Calculator = {
    id: 'lp-roi',
    name: 'Liquidity Pool ROI',
    description: 'Estimate the ROI from providing liquidity, including fees and impermanent loss.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'initialValue', label: 'Initial Investment (USD)', type: 'number', placeholder: '1000' },
        { name: 'finalValue', label: 'Final Value of LP Tokens (USD)', type: 'number', placeholder: '1100' },
        { name: 'feesEarned', label: 'Fees Earned (USD)', type: 'number', placeholder: '50' },
    ],
    calculate: (i) => {
        const { initialValue, finalValue, feesEarned } = i as { [key: string]: number };
        const netFinalValue = finalValue + feesEarned;
        const roi = (netFinalValue / initialValue) - 1;
        return { label: 'Net ROI', value: formatPercent(roi) };
    }
};