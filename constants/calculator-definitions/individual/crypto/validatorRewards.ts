import type { Calculator } from '../../../../types';
import { formatNumber, formatPercent } from '../../../../utils/helpers';

export const validatorRewardsCalculator: Calculator = {
    id: 'validator-rewards',
    name: 'Validator Rewards',
    description: 'Estimate the rewards for running a validator node on a Proof-of-Stake network.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'stakedAmount', label: 'Total Amount Staked by Validator', type: 'number', placeholder: '32' },
        { name: 'totalNetworkStake', label: 'Total Amount Staked on Network', type: 'number', placeholder: '25000000' },
        { name: 'annualIssuance', label: 'Annual Network Issuance (New Coins)', type: 'number', placeholder: '800000' },
        { name: 'uptime', label: 'Validator Uptime (%)', type: 'number', placeholder: '99.5' },
    ],
    calculate: (i) => {
        const { stakedAmount, totalNetworkStake, annualIssuance, uptime } = i as { [key: string]: number };
        const stakeShare = stakedAmount / totalNetworkStake;
        const annualReward = stakeShare * annualIssuance * (uptime / 100);
        const apy = annualReward / stakedAmount;
        return [
            { label: 'Annual Rewards (Coins)', value: formatNumber(annualReward, 6) },
            { label: 'Effective APY', value: formatPercent(apy) },
        ];
    }
};