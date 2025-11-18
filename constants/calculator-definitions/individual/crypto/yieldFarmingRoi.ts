import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent } from '../../../../utils/helpers';

export const yieldFarmingRoiCalculator: Calculator = {
    id: 'yield-farming-roi',
    name: 'Yield Farming ROI',
    description: 'Calculate total ROI from yield farming, including fees, rewards, and impermanent loss.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'initialLpValue', label: 'Initial LP Value (USD)', type: 'number', placeholder: '1000' },
        { name: 'finalLpValue', label: 'Final LP Value (USD)', type: 'number', placeholder: '950', info: 'This value reflects impermanent loss/gain.' },
        { name: 'feeRewards', label: 'Trading Fee Rewards (USD)', type: 'number', placeholder: '50' },
        { name: 'tokenRewardsValue', label: 'Farming Token Rewards (USD)', type: 'number', placeholder: '150' },
    ],
    calculate: (i) => {
        const { initialLpValue, finalLpValue, feeRewards, tokenRewardsValue } = i as { [key: string]: number };

        const lpChange = finalLpValue - initialLpValue;
        const totalProfit = lpChange + feeRewards + tokenRewardsValue;
        const roi = totalProfit / initialLpValue;

        return [
            { label: 'Impermanent Loss/Gain', value: formatCurrency(lpChange) },
            { label: 'Total Profit/Loss', value: formatCurrency(totalProfit) },
            { label: 'Net ROI', value: formatPercent(roi) },
        ];
    },
};
