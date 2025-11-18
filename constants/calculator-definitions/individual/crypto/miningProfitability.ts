import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const miningProfitabilityCalculator: Calculator = {
    id: 'mining-profitability',
    name: 'Mining Profitability',
    description: 'Estimate the profitability of a cryptocurrency mining operation.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'hashrate', label: 'Your Hashrate (TH/s)', type: 'number', placeholder: '100' },
        { name: 'powerConsumption', label: 'Power Consumption (Watts)', type: 'number', placeholder: '3000' },
        { name: 'electricityCost', label: 'Electricity Cost ($/kWh)', type: 'number', placeholder: '0.10' },
        { name: 'networkHashrate', label: 'Network Hashrate (EH/s)', type: 'number', placeholder: '600' },
        { name: 'blockReward', label: 'Block Reward (e.g., BTC)', type: 'number', placeholder: '3.125' },
        { name: 'coinPrice', label: 'Coin Price (USD)', type: 'number', placeholder: '60000' },
    ],
    calculate: (i) => {
        const { hashrate, powerConsumption, electricityCost, networkHashrate, blockReward, coinPrice } = i as { [key: string]: number };
        const yourHashrateEH = hashrate / 1000;
        const share = yourHashrateEH / networkHashrate;
        const blocksPerDay = (24 * 60) / 10; // Approx 10 min blocks for BTC
        const dailyReward = share * blocksPerDay * blockReward;
        const dailyRevenue = dailyReward * coinPrice;
        
        const dailyPowerCost = (powerConsumption / 1000) * 24 * electricityCost;
        const dailyProfit = dailyRevenue - dailyPowerCost;

        return [
            { label: 'Daily Revenue', value: formatCurrency(dailyRevenue) },
            { label: 'Daily Power Cost', value: formatCurrency(dailyPowerCost) },
            { label: 'Daily Profit', value: formatCurrency(dailyProfit) },
            { label: 'Monthly Profit', value: formatCurrency(dailyProfit * 30) },
        ];
    }
};