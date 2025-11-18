import type { Calculator } from '../../../../types';
import { parseSeries, mean, stdDev, formatNumber } from '../../../../utils/helpers';

export const stdDevPriceRangeCalculator: Calculator = {
    id: 'stddev-price-range',
    name: 'Std. Dev. Price Range',
    description: 'Calculate price bands based on standard deviations from a moving average.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'prices', label: 'Closing Prices', type: 'textarea', placeholder: '100, 102, 101, 103, 105, 104, 106, 107', info: 'Comma-separated values' },
        { name: 'period', label: 'MA Period', type: 'number', placeholder: '5' },
        { name: 'stddevs', label: 'Standard Deviations', type: 'number', placeholder: '2' },
    ],
    calculate: (i) => {
        const prices = parseSeries(i.prices as string);
        const period = i.period as number;
        const stddevs = i.stddevs as number;
        if (prices.length < period) return { error: `Not enough data for period ${period}.` };

        const recentPrices = prices.slice(-period);
        const sma = mean(recentPrices);
        const sd = stdDev(recentPrices);

        return [
            { label: `+${stddevs} SD Upper Band`, value: formatNumber(sma + (sd * stddevs)) },
            { label: `Moving Average (${period})`, value: formatNumber(sma) },
            { label: `-${stddevs} SD Lower Band`, value: formatNumber(sma - (sd * stddevs)) },
        ];
    }
};