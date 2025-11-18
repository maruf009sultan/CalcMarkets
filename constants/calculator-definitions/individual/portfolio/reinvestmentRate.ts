import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const reinvestmentRateCalculator: Calculator = {
    id: 'reinvestment-rate',
    name: 'Reinvestment Rate',
    description: 'Calculate the rate at which a company reinvests earnings back into its business.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'netIncome', label: 'Net Income', type: 'number', placeholder: '1000000' },
        { name: 'dividendsPaid', label: 'Dividends Paid', type: 'number', placeholder: '300000' },
    ],
    calculate: (i) => {
        const { netIncome, dividendsPaid } = i as { [key: string]: number };
        if (netIncome <= 0) return { error: 'Net income must be positive.' };
        const reinvestment = (netIncome - dividendsPaid) / netIncome;
        return { label: 'Reinvestment Rate', value: formatPercent(reinvestment) };
    },
};