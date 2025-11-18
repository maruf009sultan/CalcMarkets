import type { Calculator } from '../../../../types';
import { parseSeries, formatNumber } from '../../../../utils/helpers';

export const donchianChannelsCalculator: Calculator = {
    id: 'donchian-channels',
    name: 'Donchian Channels',
    description: 'Calculate the upper and lower bands based on the highest high and lowest low over a period.',
    category: 'Advanced Trading Analytics',
    inputs: [
        { name: 'highs', label: 'High Prices', type: 'textarea', placeholder: '105, 106, 105.5, 107, 106.5', info: 'Comma-separated values' },
        { name: 'lows', label: 'Low Prices', type: 'textarea', placeholder: '102, 103, 102.5, 104, 103.5', info: 'Comma-separated values' },
        { name: 'period', label: 'Period', type: 'number', placeholder: '20' },
    ],
    calculate: (i) => {
        const highs = parseSeries(i.highs as string);
        const lows = parseSeries(i.lows as string);
        const period = i.period as number;

        if (highs.length < period || lows.length < period) {
            return { error: `Not enough data for period ${period}.` };
        }
        if (highs.length !== lows.length) {
            return { error: 'Highs and Lows series must have the same length.' };
        }

        const recentHighs = highs.slice(-period);
        const recentLows = lows.slice(-period);

        const upper = Math.max(...recentHighs);
        const lower = Math.min(...recentLows);
        const middle = (upper + lower) / 2;

        return [
            { label: 'Upper Channel', value: formatNumber(upper) },
            { label: 'Middle Line', value: formatNumber(middle) },
            { label: 'Lower Channel', value: formatNumber(lower) },
        ];
    },
};
