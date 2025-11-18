import type { Calculator, CalculationResult } from '../../../../types';
import { parseSeries, formatNumber, stdDev } from '../../../../utils/helpers';

export const microstructureNoiseFilterCalculator: Calculator = {
    id: 'microstructure-noise-filter',
    name: 'Microstructure Noise Filter',
    description: 'Estimate market microstructure noise using the Roll model.',
    category: 'Order Flow & Microstructure',
    inputs: [
        { name: 'prices', label: 'Consecutive Trade Prices', type: 'textarea', placeholder: '100.01, 100.00, 100.01, 100.02, 100.01', info: 'Comma-separated high-frequency trade prices' },
    ],
    calculate: (i): CalculationResult => {
        const prices = parseSeries(i.prices as string);
        if (prices.length < 2) return { error: 'At least two price points are required.' };
        
        const priceChanges = [];
        for (let j = 1; j < prices.length; j++) {
            priceChanges.push(prices[j] - prices[j-1]);
        }
        
        if (priceChanges.length < 2) return { error: 'At least two price changes are required.' };

        // Autocovariance of price changes
        const meanChange = priceChanges.reduce((a,b)=>a+b,0)/priceChanges.length;
        let autocovariance = 0;
        for (let j = 0; j < priceChanges.length - 1; j++) {
            autocovariance += (priceChanges[j] - meanChange) * (priceChanges[j+1] - meanChange);
        }
        autocovariance /= (priceChanges.length - 1);

        if (autocovariance >= 0) {
            return { label: 'Effective Spread (Roll Model)', value: '0 (or positive covariance found)', info: "An estimate of the bid-ask spread inferred from the serial correlation of price changes, capturing the cost of 'bouncing' between the bid and ask." };
        }
        
        const effectiveSpread = 2 * Math.sqrt(-autocovariance);

        return { label: 'Effective Spread (Roll Model)', value: formatNumber(effectiveSpread, 4), info: "An estimate of the bid-ask spread inferred from the serial correlation of price changes, capturing the cost of 'bouncing' between the bid and ask." };
    },
};