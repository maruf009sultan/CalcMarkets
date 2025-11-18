import type { Calculator, CalculationResult } from '../../../../types';
import { parseSeries, formatPercent, formatNumber } from '../../../../utils/helpers';

export const maxDrawdownClustersCalculator: Calculator = {
    id: 'max-drawdown-clusters',
    name: 'Maximum Drawdown Clusters',
    description: 'Identify and analyze periods of significant drawdowns in an equity curve.',
    category: 'Quantitative Finance',
    inputs: [
        { name: 'equityValues', label: 'Equity Curve Values', type: 'textarea', placeholder: '100,110,105,120,108,100,115,125,110,95,110', info: 'Comma-separated equity values over time' },
        { name: 'threshold', label: 'Drawdown Threshold (%)', type: 'number', placeholder: '5', info: 'Minimum drawdown to be considered a cluster.' },
    ],
    calculate: (i): CalculationResult => {
        const equity = parseSeries(i.equityValues as string);
        const threshold = (i.threshold as number) / 100;
        if (equity.length < 2) return { error: 'At least two equity points are needed.' };

        const clusters = [];
        let inDrawdown = false;
        let peak = equity[0];
        let currentCluster = { start: 0, peak: 0, trough: 0, end: 0, maxDd: 0 };
        
        for (let j=0; j < equity.length; j++) {
            if (equity[j] > peak) {
                peak = equity[j];
                if (inDrawdown) {
                    currentCluster.end = j - 1;
                    if (currentCluster.maxDd >= threshold) {
                        clusters.push(currentCluster);
                    }
                    inDrawdown = false;
                }
            }
            
            const dd = (peak - equity[j]) / peak;
            
            if (dd > 0 && !inDrawdown) {
                inDrawdown = true;
                currentCluster = { start: j, peak, trough: equity[j], end: 0, maxDd: dd };
            }

            if (inDrawdown) {
                if(dd > currentCluster.maxDd) {
                    currentCluster.maxDd = dd;
                    currentCluster.trough = equity[j];
                }
            }
        }
        
        if (inDrawdown && currentCluster.maxDd >= threshold) {
            currentCluster.end = equity.length - 1;
            clusters.push(currentCluster);
        }
        
        if (clusters.length === 0) return { label: 'Result', value: `No drawdown clusters found exceeding ${formatPercent(threshold)}.` };
        
        const headers = ['Start Period', 'End Period', 'Duration', 'Max Drawdown'];
        const rows = clusters.map(c => [c.start, c.end, c.end - c.start + 1, formatPercent(c.maxDd)]);

        return {
            label: 'Drawdown Clusters',
            table: { headers, rows }
        };
    },
};
