import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const stablecoinYieldAggregatorCalculator: Calculator = {
    id: 'stablecoin-yield-aggregator',
    name: 'Stablecoin Yield Aggregator',
    description: 'Compare effective yields from multiple stablecoin lending platforms.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'platforms', label: 'Platforms (Name,APY %,Fees %)', type: 'textarea', placeholder: 'Aave,5.2,0.1\nCompound,4.8,0.05\nYearn,6.1,2.2', info: 'One platform per line: Name, Stated APY, Total Fees %' },
    ],
    calculate: (i) => {
        const lines = (i.platforms as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No platforms entered.' };
        const platforms = lines.map(line => {
            const parts = line.split(',');
            if (parts.length !== 3) throw new Error(`Invalid format: ${line}`);
            const apy = parseFloat(parts[1]) / 100;
            const fees = parseFloat(parts[2]) / 100;
            const netApy = apy * (1 - fees);
            return { name: parts[0].trim(), netApy };
        }).sort((a,b) => b.netApy - a.netApy);
        
        const headers = ['Platform', 'Net APY'];
        const rows = platforms.map(p => [p.name, formatPercent(p.netApy)]);
        return { label: 'Net Yield Comparison', table: { headers, rows } };
    }
};