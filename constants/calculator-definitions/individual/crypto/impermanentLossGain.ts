import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const impermanentLossGainCalculator: Calculator = {
    id: 'impermanent-loss-gain',
    name: 'Impermanent Loss / Gain',
    description: 'Calculate the IL/IG when providing liquidity vs. HODLing.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'priceChangeA', label: 'Price Change of Asset A (%)', type: 'number', placeholder: '50' },
        { name: 'priceChangeB', label: 'Price Change of Asset B (%)', type: 'number', placeholder: '0', defaultValue: '0', info: 'For stablecoin pairs, leave at 0' },
    ],
    calculate: (i) => {
        const changeA = 1 + (i.priceChangeA as number) / 100;
        const changeB = 1 + (i.priceChangeB as number) / 100;
        if (changeA < 0 || changeB < 0) return { error: "Price change cannot be less than -100%." };

        const valueHodl = (0.5 * changeA) + (0.5 * changeB);
        const valueLp = Math.sqrt(changeA * changeB);

        const il = (valueLp / valueHodl) - 1;
        return { label: 'Impermanent Loss/Gain', value: formatPercent(il) };
    },
};