import type { Calculator } from '../../../../types';
import { parseSeries, stdDev, formatPercent } from '../../../../utils/helpers';

export const realizedVolatilityCalculator: Calculator = {
    id: 'realized-volatility',
    name: 'Realized Volatility',
    description: 'Calculate the historical annualized volatility of an asset from price data.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'prices', label: 'Closing Prices', type: 'textarea', placeholder: '100, 101, 100.5, 102, 101.5', info: 'Comma-separated values' },
    ],
    calculate: (i) => {
        const prices = parseSeries(i.prices as string);
        if (prices.length < 2) return { error: 'At least two prices are needed.' };
        const returns = [];
        for (let j = 1; j < prices.length; j++) {
            if(prices[j-1] === 0) return { error: "Price cannot be zero." };
            returns.push(Math.log(prices[j] / prices[j - 1]));
        }
        const dailyStdDev = stdDev(returns);
        const annualizedVol = dailyStdDev * Math.sqrt(252); // Assuming 252 trading days
        return { label: 'Annualized Volatility', value: formatPercent(annualizedVol) };
    },
};