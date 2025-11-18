import type { Calculator } from '../../../../types';
import { formatPercent, solveIRR } from '../../../../utils/helpers';

export const mwrCalculator: Calculator = {
    id: 'mwr-calculator',
    name: 'Money-Weighted Return (MWR)',
    description: 'Calculate MWR (IRR), which measures performance including the effect of cash flows.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'initialValue', label: 'Initial Investment', type: 'number', placeholder: '10000' },
        { name: 'cashFlows', label: 'Cash Flows (Contribution/Withdrawal)', type: 'textarea', placeholder: '500, -200, 1000', info: 'Comma-separated values. Positive for contributions, negative for withdrawals.' },
        { name: 'finalValue', label: 'Final Portfolio Value', type: 'number', placeholder: '12500' },
    ],
    calculate: (i) => {
        const initial = -(i.initialValue as number);
        const flows = (i.cashFlows as string).split(',').map(s => -parseFloat(s.trim()));
        const final = i.finalValue as number;

        const allFlows = [initial, ...flows, final];
        
        const irr = solveIRR(allFlows);
        
        const numPeriods = allFlows.length - 1;
        if (numPeriods <= 0) return { error: "At least one period is required."};
        
        const annualizedMwr = Math.pow(1 + irr, 1) - 1; // Assuming each cashflow is one period (e.g., a year)
        
        return { label: 'Annualized MWR (IRR)', value: formatPercent(annualizedMwr) };
    },
};
