import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const cryptoStakingCalculator: Calculator = {
    id: 'crypto-staking',
    name: 'Crypto Staking',
    description: 'Estimate earnings from staking cryptocurrency.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'initialAmount', label: 'Amount Staked (Coins)', type: 'number', placeholder: '10' },
        { name: 'apy', label: 'Staking APY (%)', type: 'number', placeholder: '5' },
        { name: 'days', label: 'Staking Duration (Days)', type: 'number', placeholder: '365' },
        { name: 'coinPrice', label: 'Current Coin Price (USD)', type: 'number', placeholder: '3000' },
    ],
    calculate: (i) => {
        const dailyRate = Math.pow(1 + (i.apy as number) / 100, 1/365) - 1;
        const rewards = (i.initialAmount as number) * (Math.pow(1 + dailyRate, i.days as number) - 1);
        const totalCoins = (i.initialAmount as number) + rewards;
        return [
            { label: 'Total Rewards (Coins)', value: formatNumber(rewards, 8) },
            { label: 'Total Coins after Staking', value: formatNumber(totalCoins, 8) },
            { label: 'Total Value (USD)', value: formatCurrency(totalCoins * (i.coinPrice as number)) },
        ];
    },
};