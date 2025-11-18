import type { Calculator } from '../../../../types';
import { parseSeries, mean, stdDev, formatNumber } from '../../../../utils/helpers';

export const sqnCalculator: Calculator = {
    id: 'sqn-calculator',
    name: 'System Quality Number (SQN)',
    description: "Calculate Van Tharp's SQN to measure the quality of a trading system.",
    category: 'Backtesting & Strategy Engineering',
    inputs: [
        { name: 'trades', label: 'Trade P&L / R-Multiples', type: 'textarea', placeholder: '1.5, -1, 2.2, 3, -1, 0.8', info: "Enter P&L values. For best results, use 'R-multiples' where each trade's outcome is expressed as a multiple of the initial risk (e.g., a win of $300 on a $100 risk is 3R, a loss is -1R)." },
    ],
    calculate: (i) => {
        const trades = parseSeries(i.trades as string);
        if (trades.length < 25) return { error: 'A minimum of 25-30 trades is recommended for a stable SQN.' };

        const expectancy = mean(trades);
        const std = stdDev(trades);

        if (std === 0) return { error: 'Standard deviation is zero.' };

        const sqn = (expectancy / std) * Math.sqrt(trades.length);
        
        let quality = "Poor";
        if (sqn >= 1.6 && sqn < 2.0) quality = "Below Average";
        if (sqn >= 2.0 && sqn < 2.5) quality = "Average";
        if (sqn >= 2.5 && sqn < 3.0) quality = "Good";
        if (sqn >= 3.0 && sqn < 5.0) quality = "Excellent";
        if (sqn >= 5.0) quality = "Superb";
        
        return [
            { label: 'SQN Score', value: formatNumber(sqn, 2) },
            { label: 'System Quality', value: quality },
        ];
    },
};