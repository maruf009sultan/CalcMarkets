import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const pivotPointsCalculator: Calculator = {
    id: 'pivot-points',
    name: 'Pivot Points',
    description: 'Calculate pivot points, support, and resistance levels.',
    category: 'General Trading',
    inputs: [
        { name: 'high', label: 'Previous High', type: 'number', placeholder: '105' },
        { name: 'low', label: 'Previous Low', type: 'number', placeholder: '95' },
        { name: 'close', label: 'Previous Close', type: 'number', placeholder: '101' },
    ],
    calculate: (i) => {
        const H = i.high as number, L = i.low as number, C = i.close as number;
        if (L > H) return { error: "Low cannot be greater than High."};
        const PP = (H + L + C) / 3;
        const R1 = (2 * PP) - L;
        const S1 = (2 * PP) - H;
        const R2 = PP + (H - L);
        const S2 = PP - (H - L);
        return [
            { label: 'Resistance 2 (R2)', value: formatNumber(R2) },
            { label: 'Resistance 1 (R1)', value: formatNumber(R1) },
            { label: 'Pivot Point (PP)', value: formatNumber(PP) },
            { label: 'Support 1 (S1)', value: formatNumber(S1) },
            { label: 'Support 2 (S2)', value: formatNumber(S2) },
        ];
    },
};