import type { Calculator } from '../../../../types';

export const syntheticPositionCalculator: Calculator = {
    id: 'synthetic-position',
    name: 'Synthetic Options Position',
    description: 'Show how to replicate a stock or option position using other instruments.',
    category: 'Options',
    inputs: [
        { name: 'strike', label: 'Strike Price', type: 'number', placeholder: '100' },
    ],
    calculate: (i) => {
        const K = i.strike as number;
        return [
            { label: 'Synthetic Long Stock', value: `Long Call(${K}) + Short Put(${K})` },
            { label: 'Synthetic Short Stock', value: `Short Call(${K}) + Long Put(${K})` },
            { label: 'Synthetic Long Call', value: `Long Stock + Long Put(${K})` },
            { label: 'Synthetic Long Put', value: `Short Stock + Long Call(${K})` },
        ];
    }
};
