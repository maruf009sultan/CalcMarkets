import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent, parseSeries, percentile, mean } from '../../../../utils/helpers';

export const varCvarCalculator: Calculator = {
    id: 'var-cvar',
    name: 'Value at Risk (VaR) & CVaR',
    description: 'Estimate potential portfolio loss using Historical Value at Risk and Conditional VaR.',
    category: 'Risk Management',
    inputs: [
        { name: 'returns', label: 'Historical Returns (%)', type: 'textarea', placeholder: '1.2, -0.5, 2.1, -1.8, 0.9, -2.5, 1.5', info: 'Comma-separated daily or weekly returns' },
        { name: 'confidence', label: 'Confidence Level (%)', type: 'number', placeholder: '95' },
        { name: 'portfolioValue', label: 'Portfolio Value', type: 'number', placeholder: '100000' },
    ],
    calculate: (i) => {
        const returns = parseSeries(i.returns as string);
        const confidence = i.confidence as number;
        const portfolioValue = i.portfolioValue as number;
        if (returns.length < 10) return { error: 'A larger sample of historical returns is recommended.' };
        if (confidence < 0 || confidence > 100) return { error: 'Confidence must be between 0 and 100.' };

        const p = 100 - confidence;
        const var_percent = percentile(returns, p) / 100;
        const var_value = var_percent * portfolioValue;
        
        const tailLosses = returns.filter(r => r / 100 < var_percent);
        const cvar_percent = tailLosses.length > 0 ? mean(tailLosses) / 100 : var_percent;
        const cvar_value = cvar_percent * portfolioValue;
        
        return [
            { label: `VaR (${confidence}%)`, value: `${formatCurrency(Math.abs(var_value))} (${formatPercent(Math.abs(var_percent))})`, info: "Value at Risk: The maximum expected loss over a period at a specified confidence level." },
            { label: `CVaR / Expected Shortfall`, value: `${formatCurrency(Math.abs(cvar_value))} (${formatPercent(Math.abs(cvar_percent))})`, info: "Conditional Value at Risk: The expected loss if that VaR threshold is breached." },
        ];
    }
};