import type { Calculator } from '../../../../types';
import { parseSeries, sum, formatNumber } from '../../../../utils/helpers';

export const diversificationScoreCalculator: Calculator = {
    id: 'diversification-score',
    name: 'Portfolio Diversification Score',
    description: 'Calculate the Herfindahl-Hirschman Index (HHI) to measure portfolio concentration.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'weights', label: 'Asset Weights (%)', type: 'textarea', placeholder: '40, 30, 15, 10, 5', info: 'Comma-separated portfolio weights for each asset' },
    ],
    calculate: (i) => {
        const weights = parseSeries(i.weights as string);
        if (Math.abs(sum(weights) - 100) > 0.1) return { error: 'Weights must sum to 100%.' };
        const hhi = sum(weights.map(w => w * w));
        let interpretation = 'Highly Diversified';
        if (hhi > 1800) interpretation = 'Highly Concentrated';
        else if (hhi > 1000) interpretation = 'Moderately Concentrated';
        return [
            { label: 'HHI Score', value: formatNumber(hhi, 0) },
            { label: 'Concentration Level', value: interpretation },
        ];
    }
};