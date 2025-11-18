import type { Calculator } from '../../../../types';
import { parseSeries, mean, formatNumber, linearRegression } from '../../../../utils/helpers';

export const arimaForecastingCalculator: Calculator = {
    id: 'arima-forecasting',
    name: 'ARIMA Forecasting (AR1 Model)',
    description: 'Generate a simple forecast using a first-order autoregressive (AR1) model.',
    category: 'Quantitative Finance',
    inputs: [
        { name: 'prices', label: 'Price Series', type: 'textarea', placeholder: '100, 101, 100.5, 102, 101.5, 103', info: 'Comma-separated values' },
        { name: 'periods', label: 'Periods to Forecast', type: 'number', placeholder: '5' },
    ],
    calculate: (i) => {
        const prices = parseSeries(i.prices as string);
        const periods = i.periods as number;
        if (prices.length < 10) return { error: 'A longer historical price series is recommended.' };

        const returns = [];
        for (let j = 1; j < prices.length; j++) {
            returns.push(prices[j] - prices[j-1]);
        }
        
        const laggedReturns = [];
        for (let j = 0; j < returns.length - 1; j++) {
            laggedReturns.push({ x: returns[j], y: returns[j+1] });
        }
        
        const { slope: phi, intercept: c } = linearRegression(laggedReturns);
        
        let lastPrice = prices[prices.length - 1];
        const forecasts = [];
        for (let p = 0; p < periods; p++) {
            const nextReturn = c + phi * (lastPrice - prices[prices.length - 2]);
            lastPrice += nextReturn;
            forecasts.push(lastPrice);
        }

        const headers = ['Period', 'Forecasted Price'];
        const rows = forecasts.map((f, idx) => [idx + 1, formatNumber(f, 4)]);
        
        return {
            label: 'AR(1) Forecast',
            table: { headers, rows }
        };
    },
};
