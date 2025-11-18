import type { Calculator } from '../../../../types';
import { parseSeries, correlation, formatNumber } from '../../../../utils/helpers';

export const marketCorrelationCalculator: Calculator = {
    id: 'market-correlation',
    name: 'Market Correlation',
    description: 'Calculate the correlation coefficient between two sets of price data.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'assetA', label: 'Asset A Prices', type: 'textarea', placeholder: '10, 12, 15, 14, 16', info: 'Comma-separated values' },
        { name: 'assetB', label: 'Asset B Prices', type: 'textarea', placeholder: '100, 105, 112, 110, 115', info: 'Comma-separated values' },
    ],
    calculate: (i) => {
        const a = parseSeries(i.assetA as string);
        const b = parseSeries(i.assetB as string);
        if (a.length !== b.length || a.length < 2) return { error: "Series must have the same length and at least 2 data points."};

        const corr = correlation(a,b);
        let interpretation = 'No correlation';
        if (corr > 0.7) interpretation = 'Strong positive correlation';
        else if (corr > 0.3) interpretation = 'Moderate positive correlation';
        else if (corr > 0) interpretation = 'Weak positive correlation';
        else if (corr < -0.7) interpretation = 'Strong negative correlation';
        else if (corr < -0.3) interpretation = 'Moderate negative correlation';
        else if (corr < 0) interpretation = 'Weak negative correlation';

        return [
            { label: 'Correlation Coefficient', value: formatNumber(corr, 4) },
            { label: 'Interpretation', value: interpretation },
        ];
    }
};