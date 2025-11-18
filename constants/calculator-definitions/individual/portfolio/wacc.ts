import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const waccCalculator: Calculator = {
    id: 'wacc',
    name: 'WACC Calculator',
    description: 'Calculate the Weighted Average Cost of Capital for a company.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'marketCap', label: 'Market Cap of Equity (E)', type: 'number', placeholder: '150000000' },
        { name: 'totalDebt', label: 'Total Debt (D)', type: 'number', placeholder: '50000000' },
        { name: 'costOfEquity', label: 'Cost of Equity (Re %)', type: 'number', placeholder: '8' },
        { name: 'costOfDebt', label: 'Cost of Debt (Rd %)', type: 'number', placeholder: '5' },
        { name: 'taxRate', label: 'Corporate Tax Rate (%)', type: 'number', placeholder: '21' },
    ],
    calculate: (i) => {
        const { marketCap, totalDebt, costOfEquity, costOfDebt, taxRate } = i as { [key: string]: number };
        const V = marketCap + totalDebt;
        if (V === 0) return { error: 'Total capital (Market Cap + Debt) cannot be zero.' };
        const wacc = ((marketCap / V) * (costOfEquity / 100)) + ((totalDebt / V) * (costOfDebt / 100) * (1 - (taxRate / 100)));
        return { label: 'WACC', value: formatPercent(wacc) };
    }
};