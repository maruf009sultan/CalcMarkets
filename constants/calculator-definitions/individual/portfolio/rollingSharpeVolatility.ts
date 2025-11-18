import type { Calculator, CalculationResult } from '../../../../types';
import { parseSeries, formatNumber, formatPercent, rolling, stdDev, mean } from '../../../../utils/helpers';

export const rollingSharpeVolatilityCalculator: Calculator = {
    id: 'rolling-sharpe-volatility',
    name: 'Rolling Sharpe / Volatility',
    description: 'Calculate Sharpe Ratio and Volatility over a rolling window to see how they change over time.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'returns', label: 'Portfolio Returns (%)', type: 'textarea', placeholder: '12, -5, 8, 15, -2, 10, ...', info: 'Comma-separated values for each period' },
        { name: 'riskFreeRate', label: 'Annual Risk-Free Rate (%)', type: 'number', placeholder: '3' },
        { name: 'period', label: 'Rolling Period', type: 'number', placeholder: '12' },
        { name: 'periodsPerYear', label: 'Periods per Year', type: 'number', placeholder: '12', info: 'e.g., 12 for monthly, 252 for daily' },
    ],
    calculate: (i): CalculationResult => {
        const returns = parseSeries(i.returns as string).map(r => r / 100);
        const period = i.period as number;
        const periodsPerYear = i.periodsPerYear as number;

        if (returns.length < period) return { error: `Not enough data for period ${period}.` };

        const rfPerPeriod = (i.riskFreeRate as number) / 100 / periodsPerYear;

        const rollingVols = rolling(returns, period, (slice: number[]) => {
            return stdDev(slice) * Math.sqrt(periodsPerYear);
        });

        const rollingSharpes = rolling(returns, period, (slice: number[]) => {
            const meanReturn = mean(slice);
            const std = stdDev(slice);
            if (std === 0) return 0;
            return ((meanReturn - rfPerPeriod) / std) * Math.sqrt(periodsPerYear);
        });

        const headers = ['Window End', 'Annualized Volatility', 'Annualized Sharpe'];
        const rows = rollingVols.map((vol, idx) => [
            period + idx,
            formatPercent(vol),
            formatNumber(rollingSharpes[idx], 2)
        ]);

        return {
            label: `Rolling Statistics (${period}-Period)`,
            table: { headers, rows }
        };
    },
};
