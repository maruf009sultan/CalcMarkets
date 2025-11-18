import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent } from '../../../../utils/helpers';

export const latencyCostEstimatorCalculator: Calculator = {
    id: 'latency-cost-estimator',
    name: 'Latency Cost Estimator',
    description: 'Estimate the cost of latency based on volatility and delay.',
    category: 'Order Flow & Microstructure',
    inputs: [
        { name: 'tradeSize', label: 'Trade Size (Value)', type: 'number', placeholder: '500000' },
        { name: 'dailyVolatility', label: 'Daily Volatility (%)', type: 'number', placeholder: '1.5' },
        { name: 'latency', label: 'Latency (Milliseconds)', type: 'number', placeholder: '50' },
    ],
    calculate: (i) => {
        const { tradeSize, dailyVolatility, latency } = i as { [key: string]: number };
        const dailyVol = dailyVolatility / 100;
        const secondsInTradingDay = 6.5 * 60 * 60; // Approx seconds in a US stock market day
        const volatilityPerSecond = dailyVol / Math.sqrt(secondsInTradingDay);
        
        const costPerSecond = volatilityPerSecond * tradeSize;
        const latencyCost = costPerSecond * (latency / 1000);

        return [
            { label: 'Volatility Cost per Second', value: formatCurrency(costPerSecond) },
            { label: 'Estimated Latency Cost', value: formatCurrency(latencyCost) },
        ];
    },
};
