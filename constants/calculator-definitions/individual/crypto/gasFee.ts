import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const gasFeeCalculator: Calculator = {
    id: 'gas-fee',
    name: 'Gas Fee Estimator',
    description: 'Calculate the transaction fee for an on-chain transaction.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'gasUnits', label: 'Gas Units', type: 'number', placeholder: '21000' },
        { name: 'gasPrice', label: 'Gas Price (Gwei)', type: 'number', placeholder: '20' },
        { name: 'ethPrice', label: 'ETH Price (USD)', type: 'number', placeholder: '3000' },
    ],
    calculate: (i) => {
        const feeEth = (i.gasUnits as number) * (i.gasPrice as number) / 1_000_000_000;
        const feeUsd = feeEth * (i.ethPrice as number);
        return { label: 'Transaction Fee', value: `${formatCurrency(feeUsd)} (${formatNumber(feeEth, 8)} ETH)` };
    }
};