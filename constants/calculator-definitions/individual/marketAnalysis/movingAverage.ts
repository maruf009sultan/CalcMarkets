import type { Calculator } from '../../../../types';
import { parseSeries, mean, sum, formatNumber } from '../../../../utils/helpers';

export const movingAverageCalculator: Calculator = {
    id: 'moving-average',
    name: 'Moving Average (SMA/EMA/WMA)',
    description: 'Calculate Simple, Exponential, and Weighted Moving Averages for a data series.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'prices', label: 'Closing Prices', type: 'textarea', placeholder: '100, 102, 101, 103, 105', info: 'Comma-separated values' },
        { name: 'period', label: 'Period', type: 'number', placeholder: '3' },
    ],
    calculate: (i) => {
        const prices = parseSeries(i.prices as string);
        const period = i.period as number;
        if (prices.length < period || period <= 0) return { error: `Not enough data for period ${period}.` };
        
        const recentPrices = prices.slice(-period);
        
        // SMA
        const sma = mean(recentPrices);

        // EMA
        const k = 2 / (period + 1);
        let ema = 0;
        if (prices.length > period) {
            // Calculate initial SMA for the first EMA value
            let initialSma = mean(prices.slice(0, period));
            ema = prices.slice(period).reduce((acc, price) => (price * k) + (acc * (1-k)), initialSma);
        } else {
             ema = sma;
        }


        // WMA
        const weights = Array.from({ length: period }, (_, i) => i + 1);
        const weightSum = sum(weights);
        const wma = sum(recentPrices.map((p, idx) => p * weights[idx])) / weightSum;

        return [
            { label: `SMA (${period})`, value: formatNumber(sma, 4) },
            { label: `EMA (${period})`, value: formatNumber(ema, 4) },
            { label: `WMA (${period})`, value: formatNumber(wma, 4) },
        ];
    }
};