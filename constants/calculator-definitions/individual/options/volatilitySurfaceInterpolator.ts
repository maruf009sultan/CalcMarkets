import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const volatilitySurfaceInterpolatorCalculator: Calculator = {
    id: 'volatility-surface-interpolator',
    name: 'Volatility Surface Interpolator',
    description: 'Estimate implied volatility using bilinear interpolation from known points on the vol surface.',
    category: 'Options',
    inputs: [
        { name: 'k1', label: 'Strike 1', type: 'number', placeholder: '90' },
        { name: 't1', label: 'Expiry 1 (Years)', type: 'number', placeholder: '0.25' },
        { name: 'k2', label: 'Strike 2', type: 'number', placeholder: '110' },
        { name: 't2', label: 'Expiry 2 (Years)', type: 'number', placeholder: '0.5' },
        { name: 'vol11', label: 'Volatility at (K1, T1) %', type: 'number', placeholder: '32' },
        { name: 'vol12', label: 'Volatility at (K1, T2) %', type: 'number', placeholder: '28' },
        { name: 'vol21', label: 'Volatility at (K2, T1) %', type: 'number', placeholder: '25' },
        { name: 'vol22', label: 'Volatility at (K2, T2) %', type: 'number', placeholder: '22' },
        { name: 'k_target', label: 'Target Strike', type: 'number', placeholder: '102' },
        { name: 't_target', label: 'Target Expiry (Years)', type: 'number', placeholder: '0.35' },
    ],
    calculate: (i) => {
        const { k1, t1, k2, t2, vol11, vol12, vol21, vol22, k_target, t_target } = i as { [key: string]: number };

        if (k2 - k1 === 0 || t2 - t1 === 0) {
            return { error: "Strike and Expiry points must be different." };
        }
        
        const f1 = ((k2 - k_target) / (k2 - k1)) * (vol11/100) + ((k_target - k1) / (k2 - k1)) * (vol21/100);
        const f2 = ((k2 - k_target) / (k2 - k1)) * (vol12/100) + ((k_target - k1) / (k2 - k1)) * (vol22/100);

        const interpolatedVol = ((t2 - t_target) / (t2 - t1)) * f1 + ((t_target - t1) / (t2 - t1)) * f2;
        
        return { label: 'Interpolated Implied Volatility', value: formatPercent(interpolatedVol) };
    },
};
