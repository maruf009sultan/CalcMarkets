import type { Calculator } from '../../../../types';
import { parseSeries, sum, formatCurrency } from '../../../../utils/helpers';

export const cashFlowDiscountingCalculator: Calculator = {
    id: 'cash-flow-discounting',
    name: 'Cash Flow Discounting',
    description: 'Calculate the present value of a series of future cash flows.',
    category: 'Investment Valuation',
    inputs: [
        { name: 'cashFlows', label: 'Future Cash Flows', type: 'textarea', placeholder: '100, 110, 120, 130', info: 'Comma-separated values' },
        { name: 'discountRate', label: 'Discount Rate (%)', type: 'number', placeholder: '8' },
    ],
    calculate: (i) => {
        const flows = parseSeries(i.cashFlows as string);
        const rate = (i.discountRate as number) / 100;
        const discountedFlows = flows.map((cf, idx) => cf / Math.pow(1 + rate, idx + 1));
        const presentValue = sum(discountedFlows);
        return { label: 'Present Value of Cash Flows', value: formatCurrency(presentValue) };
    }
};