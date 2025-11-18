import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber, formatPercent } from '../../../../utils/helpers';

export const dripCalculator: Calculator = {
    id: 'drip',
    name: 'Dividend Reinvestment (DRIP)',
    description: 'Project portfolio growth with dividends automatically reinvested.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'initialShares', label: 'Initial Shares', type: 'number', placeholder: '100' },
        { name: 'initialPrice', label: 'Initial Share Price', type: 'number', placeholder: '50' },
        { name: 'dividendYield', label: 'Annual Dividend Yield (%)', type: 'number', placeholder: '3' },
        { name: 'dividendFrequency', label: 'Dividends per Year', type: 'number', placeholder: '4' },
        { name: 'annualGrowth', label: 'Annual Share Price Growth (%)', type: 'number', placeholder: '5' },
        { name: 'years', label: 'Years to Grow', type: 'number', placeholder: '10' },
    ],
    calculate: (i) => {
        let { initialShares, initialPrice, dividendYield, dividendFrequency, annualGrowth, years } = i as { [key: string]: number };

        let totalShares = initialShares;
        let currentPrice = initialPrice;
        const periods = years * dividendFrequency;
        const growthPerPeriod = Math.pow(1 + annualGrowth / 100, 1 / dividendFrequency);
        const dividendPerPeriod = (dividendYield / 100) / dividendFrequency;

        for (let p = 0; p < periods; p++) {
            const totalDividends = totalShares * currentPrice * dividendPerPeriod;
            currentPrice *= growthPerPeriod;
            const newShares = totalDividends / currentPrice;
            totalShares += newShares;
        }

        const finalValue = totalShares * currentPrice;
        const initialValue = initialShares * initialPrice;
        
        return [
            { label: 'Final Portfolio Value', value: formatCurrency(finalValue) },
            { label: 'Total Shares', value: formatNumber(totalShares, 4) },
            { label: 'Growth vs. No DRIP', value: formatPercent((finalValue / (initialValue * Math.pow(1 + annualGrowth/100, years))) - 1) },
        ];
    }
};