import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent } from '../../../../utils/helpers';

export const coveredCallCalculator: Calculator = {
    id: 'covered-call',
    name: 'Covered Call',
    description: 'Calculate the potential profit and breakeven for a covered call strategy.',
    category: 'Options',
    inputs: [
        { name: 'purchasePrice', label: 'Stock Purchase Price per Share', type: 'number', placeholder: '45' },
        { name: 'strikePrice', label: 'Call Strike Price', type: 'number', placeholder: '50' },
        { name: 'premium', label: 'Premium Received per Share', type: 'number', placeholder: '2' },
        { name: 'shares', label: 'Number of Shares', type: 'number', placeholder: '100' },
    ],
    calculate: (i) => {
        const purchase = i.purchasePrice as number;
        const strike = i.strikePrice as number;
        const premium = i.premium as number;
        const shares = i.shares as number;

        const breakeven = purchase - premium;
        const maxProfit = (strike - purchase + premium) * shares;
        const roiIfAssigned = (strike - purchase + premium) / purchase;
        const roiIfNotAssigned = premium / purchase;

        return [
            { label: 'Breakeven Stock Price', value: formatCurrency(breakeven) },
            { label: 'Max Profit (if assigned)', value: formatCurrency(maxProfit) },
            { label: 'ROI (if assigned)', value: formatPercent(roiIfAssigned) },
            { label: 'ROI (if not assigned)', value: formatPercent(roiIfNotAssigned) },
        ];
    }
};