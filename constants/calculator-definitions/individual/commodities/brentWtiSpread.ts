import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const brentWtiSpreadCalculator: Calculator = {
    id: 'brent-wti-spread',
    name: 'Brent-WTI Spread P&L',
    description: 'Calculate the spread between Brent and WTI crude oil and the P&L from trading it.',
    category: 'Commodities & Niche',
    inputs: [
        { name: 'brentPrice', label: 'Brent Crude Price', type: 'number', placeholder: '85.50' },
        { name: 'wtiPrice', label: 'WTI Crude Price', type: 'number', placeholder: '81.00' },
        { name: 'entrySpread', label: 'Your Entry Spread', type: 'number', placeholder: '4.00' },
        { name: 'contracts', label: 'Number of Contracts', type: 'number', placeholder: '10' },
    ],
    calculate: (i) => {
        const { brentPrice, wtiPrice, entrySpread, contracts } = i as { [key: string]: number };
        const currentSpread = brentPrice - wtiPrice;
        const pnlPerContract = (currentSpread - entrySpread) * 1000; // 1000 barrels per contract
        const totalPnl = pnlPerContract * contracts;

        return [
            { label: 'Current Spread', value: formatCurrency(currentSpread) },
            { label: 'Total P&L', value: formatCurrency(totalPnl) },
        ];
    },
};
