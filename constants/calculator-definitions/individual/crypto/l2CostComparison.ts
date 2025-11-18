import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent } from '../../../../utils/helpers';

export const l2CostComparisonCalculator: Calculator = {
    id: 'l2-cost-comparison',
    name: 'Layer-2 Transaction Cost Comparison',
    description: 'Compare the cost of a transaction on Ethereum L1 vs. various Layer-2 solutions.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'l1_gas', label: 'L1 Gas Fee (USD)', type: 'number', placeholder: '35.00' },
        { name: 'l2_costs', label: 'L2 Costs (Name,Fee USD)', type: 'textarea', placeholder: 'Arbitrum,0.25\nOptimism,0.30\nzkSync,0.45', info: 'One L2 per line: Name, Typical Fee in USD' },
    ],
    calculate: (i) => {
        const l1Cost = i.l1_gas as number;
        const lines = (i.l2_costs as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No L2 platforms entered.' };
        
        const headers = ['Platform', 'Fee', 'Savings vs. L1'];
        const rows = lines.map(line => {
            const parts = line.split(',');
            if (parts.length !== 2) throw new Error(`Invalid format: ${line}`);
            const fee = parseFloat(parts[1]);
            const savings = 1 - (fee / l1Cost);
            return [parts[0].trim(), formatCurrency(fee), formatPercent(savings)];
        });

        rows.unshift(['Ethereum L1', formatCurrency(l1Cost), formatPercent(0)]);
        return { label: 'Transaction Cost Comparison', table: { headers, rows } };
    }
};