import type { Calculator } from '../../../../types';
import { parseSeries, stdDev, mean, formatNumber, formatPercent, omegaRatio } from '../../../../utils/helpers';

export const ratiosCalculator: Calculator = {
    id: 'sharpe-sortino-calmar-omega-ratio',
    name: 'Sharpe/Sortino/Calmar/Omega Ratios',
    description: 'Measure risk-adjusted return, focusing on total, downside, and drawdown risk.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'returns', label: 'Portfolio Returns (%)', type: 'textarea', placeholder: '12, -5, 8, 15, -2, 10', info: 'Comma-separated values for each period' },
        { name: 'riskFreeRate', label: 'Annual Risk-Free Rate (%)', type: 'number', placeholder: '3' },
    ],
    calculate: (i) => {
        const returns = parseSeries(i.returns as string).map(r => r / 100);
        if (returns.length < 2) return { error: "At least two return data points are needed." };
        
        const n = returns.length;
        const rfPerPeriod = (i.riskFreeRate as number) / 100 / n; 
        
        const meanReturn = mean(returns);
        const portfolioStdDev = stdDev(returns);

        // Max Drawdown
        let peak = -Infinity;
        let maxDd = 0;
        const cumulativeReturns = returns.reduce((acc, r) => { acc.push((acc.length > 0 ? acc[acc.length-1] : 1) * (1+r)); return acc; }, [] as number[]);
        cumulativeReturns.forEach(val => {
            peak = Math.max(peak, val);
            const dd = (peak - val) / peak;
            maxDd = Math.max(maxDd, dd);
        });
        
        const sharpe = portfolioStdDev === 0 ? 0 : (meanReturn - rfPerPeriod) / portfolioStdDev;
        
        const negativeReturns = returns.filter(r => r < rfPerPeriod); // Returns below risk-free rate
        const downsideDeviation = stdDev(negativeReturns);
        const sortino = downsideDeviation === 0 ? 0 : (meanReturn - rfPerPeriod) / downsideDeviation;

        const annualizedReturn = Math.pow(1 + meanReturn, n) -1;
        const calmar = maxDd === 0 ? 0 : annualizedReturn / maxDd;

        const omega = omegaRatio(returns, rfPerPeriod);
        
        return [
            { label: 'Sharpe Ratio (Annualized)', value: formatNumber(sharpe * Math.sqrt(n), 3), info: "Measures return per unit of total risk (standard deviation). Higher is better." },
            { label: 'Sortino Ratio (Annualized)', value: formatNumber(sortino * Math.sqrt(n), 3), info: "Similar to Sharpe, but only considers downside volatility (harmful risk). Higher is better." },
            { label: 'Calmar Ratio', value: formatNumber(calmar, 3), info: "Measures return per unit of maximum drawdown risk. Higher is better." },
            { label: 'Omega Ratio', value: formatNumber(omega, 3), info: "Captures all moments of the returns distribution by partitioning gains vs. losses. An Omega > 1 is desirable." },
            { label: 'Max Drawdown', value: formatPercent(maxDd), info: "The largest peak-to-trough decline in the portfolio's value during the period."},
        ];
    },
};