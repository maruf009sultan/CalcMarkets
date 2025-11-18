import type { Calculator } from '../../../../types';
import { formatCurrency, formatPercent } from '../../../../utils/helpers';

export const effectiveSlippageEstimatorCalculator: Calculator = {
    id: 'effective-slippage-estimator',
    name: 'Effective Slippage Estimator',
    description: 'Calculate the slippage between the expected fill price and the actual average fill price.',
    category: 'Order Flow & Microstructure',
    inputs: [
        { name: 'expectedPrice', label: 'Expected Fill Price (e.g., Mid-point)', type: 'number', placeholder: '150.50' },
        { name: 'averageFillPrice', label: 'Actual Average Fill Price', type: 'number', placeholder: '150.55' },
        { name: 'tradeValue', label: 'Total Trade Value', type: 'number', placeholder: '10000' },
    ],
    calculate: (i) => {
        const { expectedPrice, averageFillPrice, tradeValue } = i as { [key: string]: number };
        if (expectedPrice <= 0) return { error: 'Expected price must be positive.' };

        const slippagePerShare = averageFillPrice - expectedPrice;
        const slippagePercent = slippagePerShare / expectedPrice;
        const totalSlippageCost = (slippagePercent) * tradeValue;

        return [
            { label: 'Slippage per Share', value: formatCurrency(slippagePerShare) },
            { label: 'Slippage Percentage', value: formatPercent(slippagePercent) },
            { label: 'Total Slippage Cost', value: formatCurrency(totalSlippageCost) },
        ];
    },
};
