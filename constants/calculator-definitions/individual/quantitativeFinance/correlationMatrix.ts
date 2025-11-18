import type { Calculator, CalculationResult } from '../../../../types';
import { correlation, formatNumber } from '../../../../utils/helpers';

export const correlationMatrixGeneratorCalculator: Calculator = {
    id: 'correlation-matrix-generator',
    name: 'Correlation Matrix Generator',
    description: 'Generate a correlation matrix for multiple asset price series.',
    category: 'Quantitative Finance',
    inputs: [
        { name: 'assets', label: 'Asset Price Series', type: 'textarea', placeholder: 'AssetA,10,12,15,14\nAssetB,100,105,112,110\nAssetC,50,48,52,55', info: 'One asset per line: Ticker, comma-separated prices' },
    ],
    calculate: (i): CalculationResult => {
        const lines = (i.assets as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length < 2) return { error: 'At least two assets are needed.' };

        const assets = lines.map(line => {
            const parts = line.split(',');
            const name = parts[0];
            const prices = parts.slice(1).map(parseFloat);
            return { name, prices };
        });

        const numPoints = assets[0].prices.length;
        for(const asset of assets) {
            if (asset.prices.length !== numPoints) return { error: 'All price series must have the same length.' };
        }

        const headers = [''].concat(assets.map(a => a.name));
        const rows = [];
        for (let i = 0; i < assets.length; i++) {
            const row = [assets[i].name];
            for (let j = 0; j < assets.length; j++) {
                const corr = correlation(assets[i].prices, assets[j].prices);
                row.push(formatNumber(corr, 3));
            }
            rows.push(row);
        }
        
        return {
            label: 'Correlation Matrix',
            table: { headers, rows }
        };
    },
};
