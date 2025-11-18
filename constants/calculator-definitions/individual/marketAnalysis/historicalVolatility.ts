import type { Calculator } from '../../../../types';
import { parseSeries, stdDev, formatPercent } from '../../../../utils/helpers';

export const historicalVolatilityCalculator: Calculator = {
    id: 'historical-volatility',
    name: 'Historical Volatility (HV)',
    description: 'Calculate the annualized historical volatility from a series of closing prices.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'prices', label: 'Closing Prices', type: 'textarea', placeholder: '100,102,101,103,105', info: 'Comma-separated daily closing prices' },
        { name: 'tradingDays', label: 'Trading Days in Year', type: 'number', placeholder: '252', defaultValue: '252' },
    ],
    calculate: (i) => {
        const prices = parseSeries(i.prices as string);
        if (prices.length < 2) return { error: 'At least two price points are required.' };
        const returns = [];
        for (let j = 1; j < prices.length; j++) {
            returns.push(Math.log(prices[j] / prices[j-1]));
        }
        const std = stdDev(returns);
        const hv = std * Math.sqrt(i.tradingDays as number);
        return { label: 'Annualized Historical Volatility', value: formatPercent(hv) };
    }
};