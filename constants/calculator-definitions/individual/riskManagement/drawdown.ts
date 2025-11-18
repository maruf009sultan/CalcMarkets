import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent } from '../../../../utils/helpers';

export const drawdownCalculator: Calculator = {
    id: 'drawdown',
    name: 'Drawdown',
    description: 'Calculate the percentage decline from a portfolio\'s peak to its trough.',
    category: 'Risk Management',
    inputs: [
        { name: 'peakValue', label: 'Peak Portfolio Value', type: 'number', placeholder: '120000' },
        { name: 'troughValue', label: 'Trough Portfolio Value', type: 'number', placeholder: '95000' },
    ],
    calculate: (i) => {
        const peak = i.peakValue as number;
        const trough = i.troughValue as number;
        if (peak <= 0) return { error: "Peak value must be positive."};
        if (trough > peak) return { error: "Trough value cannot be greater than peak value."};
        const drawdown = (peak - trough) / peak;
        return [
            { label: 'Absolute Drawdown', value: formatCurrency(peak - trough) },
            { label: 'Maximum Drawdown', value: formatPercent(drawdown) },
        ];
    },
};