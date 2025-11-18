import type { Calculator } from '../../../../types';
import { parseSeries, formatNumber } from '../../../../utils/helpers';

export const mfeMaeCalculator: Calculator = {
    id: 'mfe-mae',
    name: 'MFE / MAE',
    description: 'Calculate Maximum Favorable and Adverse Excursion from trade prices.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'entryPrice', label: 'Entry Price', type: 'number', placeholder: '100' },
        { name: 'tradePrices', label: 'Intra-Trade Prices', type: 'textarea', placeholder: '101, 102.5, 99.5, 103, 101.5', info: 'Comma-separated prices during the trade' },
    ],
    calculate: (i) => {
        const entry = i.entryPrice as number;
        const prices = parseSeries(i.tradePrices as string);
        if (prices.length < 1) return { error: 'At least one intra-trade price is needed.' };
        
        const mfe = Math.max(...prices) - entry;
        const mae = entry - Math.min(...prices);

        return [
            { label: 'Max Favorable Excursion (MFE)', value: formatNumber(mfe, 4) },
            { label: 'Max Adverse Excursion (MAE)', value: formatNumber(mae, 4) },
        ];
    }
};