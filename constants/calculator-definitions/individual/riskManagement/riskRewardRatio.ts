import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const riskRewardRatioCalculator: Calculator = {
    id: 'risk-reward-ratio',
    name: 'Risk-Reward Ratio',
    description: 'Calculate the ratio of potential profit to potential loss for a trade.',
    category: 'Risk Management',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '150.00' },
        { name: 'takeProfitPrice', label: 'Take-Profit Price', type: 'number', placeholder: '165.00' },
        { name: 'stopLossPrice', label: 'Stop-Loss Price', type: 'number', placeholder: '145.00' },
    ],
    calculate: (i) => {
        const potentialProfit = (i.takeProfitPrice as number) - (i.entryPrice as number);
        const potentialLoss = (i.entryPrice as number) - (i.stopLossPrice as number);
        if (potentialProfit <= 0 || potentialLoss <= 0) return { error: 'Invalid price levels. Ensure Take-Profit > Entry > Stop-Loss for a long trade.' };
        const ratio = potentialProfit / potentialLoss;
        return { label: 'Risk-Reward Ratio', value: `1 : ${formatNumber(ratio)}` };
    },
};