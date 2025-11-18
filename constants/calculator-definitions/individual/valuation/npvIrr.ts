import type { Calculator } from '../../../../types';
import { parseSeries, sum, formatCurrency, formatPercent } from '../../../../utils/helpers';

export const npvIrrCalculator: Calculator = {
    id: 'npv-irr',
    name: 'NPV & IRR Calculator',
    description: 'Calculate Net Present Value and Internal Rate of Return for a series of cash flows.',
    category: 'Investment Valuation',
    inputs: [
        { name: 'initialInvestment', label: 'Initial Investment', type: 'number', placeholder: '1000' },
        { name: 'cashFlows', label: 'Cash Flows per Period', type: 'textarea', placeholder: '200, 300, 400, 500', info: 'Comma-separated values' },
        { name: 'discountRate', label: 'Discount Rate (%)', type: 'number', placeholder: '10' },
    ],
    calculate: (i) => {
        const initial = i.initialInvestment as number;
        const flows = parseSeries(i.cashFlows as string);
        const rate = (i.discountRate as number) / 100;
        if (flows.length === 0) return { error: 'Enter at least one cash flow.' };

        const allFlows = [-initial, ...flows];

        // NPV
        const npv = sum(allFlows.map((cf, idx) => cf / Math.pow(1 + rate, idx)));
        
        // IRR (Bisection method)
        let lower = -0.99, upper = 1.0, irr = 0;
        for (let j = 0; j < 100; j++) {
            irr = (lower + upper) / 2;
            if (irr === lower || irr === upper) break;
            const currentNPV = sum(allFlows.map((cf, idx) => cf / Math.pow(1 + irr, idx)));
            if (Math.abs(currentNPV) < 0.01) break;
            if (currentNPV > 0) lower = irr;
            else upper = irr;
        }

        return [
            { label: 'Net Present Value (NPV)', value: formatCurrency(npv) },
            { label: 'Internal Rate of Return (IRR)', value: formatPercent(irr) },
        ];
    }
};