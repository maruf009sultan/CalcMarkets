import type { Calculator } from '../../../../types';
import { parseSeries, sum, formatCurrency } from '../../../../utils/helpers';

export const dcfCalculator: Calculator = {
    id: 'dcf',
    name: 'Intrinsic Value (DCF)',
    description: 'Calculate a stock\'s intrinsic value using a Discounted Cash Flow model.',
    category: 'Investment Valuation',
    inputs: [
        { name: 'cashFlows', label: 'Future Cash Flows (FCF)', type: 'textarea', placeholder: '100, 110, 121, 133, 146', info: 'Comma-separated Free Cash Flow projections for the next N years.' },
        { name: 'terminalGrowthRate', label: 'Terminal Growth Rate (%)', type: 'number', placeholder: '2.5', info: "The constant rate at which the company's FCF is expected to grow forever after the explicit forecast period." },
        { name: 'wacc', label: 'Discount Rate (WACC %)', type: 'number', placeholder: '8', info: "Weighted Average Cost of Capital. The average rate of return a company must pay to its security holders." },
        { name: 'sharesOutstanding', label: 'Shares Outstanding', type: 'number', placeholder: '1000', info: "The total number of a company's shares held by all its shareholders." },
    ],
    calculate: (i) => {
        const cashFlows = parseSeries(i.cashFlows as string);
        if (cashFlows.length === 0) return { error: 'Please enter at least one cash flow.' };
        const tgr = (i.terminalGrowthRate as number) / 100;
        const wacc = (i.wacc as number) / 100;
        const shares = i.sharesOutstanding as number;

        if (wacc <= tgr) return { error: 'WACC must be greater than the Terminal Growth Rate.' };
        if (shares <= 0) return { error: 'Shares Outstanding must be positive.' };

        const lastCF = cashFlows[cashFlows.length - 1];
        const terminalValue = (lastCF * (1 + tgr)) / (wacc - tgr);
        
        const dcfValues = cashFlows.map((cf, idx) => cf / Math.pow(1 + wacc, idx + 1));
        const terminalDcf = terminalValue / Math.pow(1 + wacc, cashFlows.length);

        const enterpriseValue = sum(dcfValues) + terminalDcf;
        const intrinsicValue = enterpriseValue / shares;

        return [
            { label: 'Enterprise Value', value: formatCurrency(enterpriseValue) },
            { label: 'Intrinsic Value per Share', value: formatCurrency(intrinsicValue) },
        ];
    }
};