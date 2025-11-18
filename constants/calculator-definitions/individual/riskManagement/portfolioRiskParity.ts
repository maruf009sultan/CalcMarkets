import type { Calculator } from '../../../../types';
import { formatPercent, sum } from '../../../../utils/helpers';

export const portfolioRiskParityCalculator: Calculator = {
    id: 'portfolio-risk-parity',
    name: 'Portfolio Risk Parity',
    description: 'Allocate capital based on inverse volatility to equalize risk contribution.',
    category: 'Risk Management',
    inputs: [
        { name: 'assets', label: 'Assets (Ticker,Volatility %)', type: 'textarea', placeholder: 'SPY,15\nAGG,5\nGLD,18', info: 'One asset per line: Ticker, Annualized Volatility %' },
    ],
    calculate: (i) => {
        const lines = (i.assets as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No assets entered.' };
        const assets = lines.map(line => {
            const parts = line.split(',');
            if (parts.length !== 2) throw new Error(`Invalid format: ${line}`);
            const vol = parseFloat(parts[1]);
            if (vol <= 0) throw new Error('Volatility must be positive.');
            return { ticker: parts[0].trim(), vol: vol / 100, invVol: 1 / (vol / 100) };
        });
        const totalInvVol = sum(assets.map(a => a.invVol));
        const headers = ['Ticker', 'Volatility', 'Weight'];
        const rows = assets.map(asset => {
            const weight = asset.invVol / totalInvVol;
            return [asset.ticker, formatPercent(asset.vol), formatPercent(weight)];
        });
        return { label: 'Risk Parity Allocation', table: { headers, rows } };
    }
};