import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const currencyConverterCalculator: Calculator = {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert an amount from one currency to another using a specific exchange rate.',
    category: 'Forex & Futures',
    inputs: [
        { name: 'amount', label: 'Amount', type: 'number', placeholder: '100' },
        { name: 'exchangeRate', label: 'Exchange Rate', type: 'number', placeholder: '1.085', info: 'e.g., Rate for EUR/USD to convert EUR to USD' },
    ],
    calculate: (i) => {
        const { amount, exchangeRate } = i as { [key: string]: number };
        const converted = amount * exchangeRate;
        return { label: 'Converted Amount', value: formatNumber(converted) };
    }
};