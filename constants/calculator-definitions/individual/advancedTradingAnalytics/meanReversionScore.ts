import type { Calculator } from '../../../../types';
import { parseSeries, mean, stdDev, formatNumber } from '../../../../utils/helpers';

export const meanReversionScoreCalculator: Calculator = {
    id: 'mean-reversion-score',
    name: 'Mean Reversion Score',
    description: 'Quantify how far a price has deviated from its recent mean, using Z-Score.',
    category: 'Advanced Trading Analytics',
    inputs: [
        { name: 'prices', label: 'Price Series', type: 'textarea', placeholder: '100, 102, 101, 103, 105, 104, 106, 107, 115', info: 'Comma-separated values' },
        { name: 'period', label: 'Lookback Period', type: 'number', placeholder: '20' },
    ],
    calculate: (i) => {
        const prices = parseSeries(i.prices as string);
        const period = i.period as number;
        if (prices.length < period) return { error: `Not enough data for period ${period}.` };

        const recentPrices = prices.slice(-period);
        const currentPrice = recentPrices[recentPrices.length - 1];
        const mu = mean(recentPrices);
        const sd = stdDev(recentPrices);
        if (sd === 0) return { error: 'Standard deviation is zero, cannot calculate score.' };
        
        const zScore = (currentPrice - mu) / sd;
        
        let interpretation = 'Near the mean';
        if (zScore > 2) interpretation = 'Highly extended to the upside (potential short)';
        else if (zScore > 1) interpretation = 'Moderately extended to the upside';
        else if (zScore < -2) interpretation = 'Highly extended to the downside (potential long)';
        else if (zScore < -1) interpretation = 'Moderately extended to the downside';

        return [
            { label: 'Z-Score (Std. Deviations from Mean)', value: formatNumber(zScore, 3) },
            { label: 'Interpretation', value: interpretation },
        ];
    },
};
