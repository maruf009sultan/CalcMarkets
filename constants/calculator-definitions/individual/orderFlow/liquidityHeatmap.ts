import type { Calculator, CalculationResult } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const liquidityHeatmapCalculator: Calculator = {
    id: 'liquidity-heatmap',
    name: 'Liquidity Heatmap (Order Book)',
    description: 'Visualize the distribution of limit order liquidity in the order book.',
    category: 'Order Flow & Microstructure',
    inputs: [
        { name: 'orders', label: 'Order Book Data (Price,Size)', type: 'textarea', placeholder: '100.00,500\n99.95,800\n100.05,400\n100.10,700', info: 'One order per line: Price, Size. Bids and asks are separated automatically.' },
        { name: 'currentPrice', label: 'Current Market Price', type: 'number', placeholder: '100.02' },
    ],
    calculate: (i): CalculationResult => {
        const lines = (i.orders as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No order data entered.' };
        const currentPrice = i.currentPrice as number;
        
        const bids = lines.map(line => line.split(',').map(parseFloat)).filter(p => p[0] < currentPrice).sort((a,b) => b[0] - a[0]);
        const asks = lines.map(line => line.split(',').map(parseFloat)).filter(p => p[0] > currentPrice).sort((a,b) => a[0] - b[0]);
        
        const totalBidLiq = bids.reduce((s, b) => s + b[1], 0);
        const totalAskLiq = asks.reduce((s, a) => s + a[1], 0);

        const createRow = (price: number, size: number, total: number) => {
            const percentage = (size / total) * 100;
            const bar = '█'.repeat(Math.round(percentage / 2)); // Create a simple bar chart
            return [formatNumber(price, 2), formatNumber(size, 0), `${bar} (${formatNumber(percentage, 1)}%)`];
        }

        const headers = ['Price Level', 'Size', 'Liquidity Distribution'];
        const askRows = asks.map(a => createRow(a[0], a[1], totalAskLiq));
        const bidRows = bids.map(b => createRow(b[0], b[1], totalBidLiq));
        
        const rows = [...askRows.reverse(), ['--- Spread ---', '---', '---'], ...bidRows];

        return {
            label: 'Order Book Liquidity',
            table: { headers, rows }
        };
    },
};
