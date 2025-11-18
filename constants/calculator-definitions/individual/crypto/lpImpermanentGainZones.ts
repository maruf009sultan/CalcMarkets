import type { Calculator } from '../../../../types';
import { formatPercent, formatNumber } from '../../../../utils/helpers';

export const lpImpermanentGainZonesCalculator: Calculator = {
    id: 'lp-impermanent-gain-zones',
    name: 'LP Impermanent Gain Zones',
    description: 'Calculate price change ratios where providing liquidity outperforms HODLing.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'feeApr', label: 'Pool Fee APR (%)', type: 'number', placeholder: '20' },
        { name: 'days', label: 'Holding Period (Days)', type: 'number', placeholder: '30' },
    ],
    calculate: (i) => {
        const { feeApr, days } = i as { [key: string]: number };
        const feeReturn = (1 + feeApr / 100)**(days / 365);
        
        // We need to solve: feeReturn * sqrt(k) > (1+k)/2, where k is price ratio
        // This is a quadratic inequality: (feeReturn^2) * k > (1+2k+k^2)/4
        // k^2 + (2 - 4*feeReturn^2)k + 1 < 0
        const a = 1;
        const b = 2 - 4 * feeReturn**2;
        const c = 1;
        
        const discriminant = b*b - 4*a*c;
        if (discriminant < 0) {
            return { label: 'Result', value: 'LP outperforms HODL at all price ratios for this APR.' };
        }
        
        const k1 = (-b - Math.sqrt(discriminant)) / (2*a);
        const k2 = (-b + Math.sqrt(discriminant)) / (2*a);
        
        return [
            { label: 'HODL Outperforms If Price Ratio Is Below', value: formatNumber(k1, 4) },
            { label: 'HODL Outperforms If Price Ratio Is Above', value: formatNumber(k2, 4) },
            { label: 'Interpretation', value: 'LP is more profitable than HODL as long as the ratio of asset prices stays between these two values.'}
        ];
    },
};
