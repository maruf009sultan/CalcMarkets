import type { Calculator, CalculationResult } from '../../../../types';
import { parseSeries, formatCurrency, formatPercent, formatNumber } from '../../../../utils/helpers';

export const equityCurveSimulatorCalculator: Calculator = {
    id: 'equity-curve-simulator',
    name: 'Equity Curve Simulator',
    description: 'Simulate and analyze an equity curve based on a series of trade P&Ls.',
    category: 'Risk Management',
    inputs: [
        { name: 'initialCapital', label: 'Initial Capital', type: 'number', placeholder: '10000' },
        { name: 'trades', label: 'Trade P&L Series', type: 'textarea', placeholder: '250, -100, 300, -150, 400', info: 'Comma-separated P&L for each trade' },
    ],
    calculate: (inputs): CalculationResult[] => {
        const initialCapital = inputs.initialCapital as number;
        const trades = parseSeries(inputs.trades as string);
        if (trades.length === 0) {
            return [{ error: 'No trades entered.' }];
        }

        const equityCurve = [initialCapital];
        let currentEquity = initialCapital;
        let peakEquity = initialCapital;
        let maxDrawdown = 0;

        for (const pnl of trades) {
            currentEquity += pnl;
            equityCurve.push(currentEquity);
            
            if (currentEquity > peakEquity) {
                peakEquity = currentEquity;
            }
            
            const drawdown = (peakEquity - currentEquity) / peakEquity;
            if (drawdown > maxDrawdown) {
                maxDrawdown = drawdown;
            }
        }

        const finalEquity = equityCurve[equityCurve.length - 1];
        const totalPnl = finalEquity - initialCapital;

        const results: CalculationResult[] = [
            { label: 'Final Equity', value: formatCurrency(finalEquity) },
            { label: 'Total P&L', value: formatCurrency(totalPnl) },
            { label: 'Peak Equity', value: formatCurrency(peakEquity) },
            { label: 'Maximum Drawdown', value: formatPercent(maxDrawdown) },
        ];
        
        const headers = ['Trade #', 'Equity Value'];
        const rows = equityCurve.map((equity, index) => [index, formatCurrency(equity)]);

        results.push({
            label: 'Equity Curve Progression',
            table: { headers, rows }
        });

        return results;
    },
};
