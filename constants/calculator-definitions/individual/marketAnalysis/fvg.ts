import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const fvgCalculator: Calculator = {
    id: 'fvg',
    name: 'Fair Value Gap (FVG)',
    description: 'Identify the price range of a Fair Value Gap (imbalance) from candle data.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'candle1_low', label: 'Candle 1 Low', type: 'number', placeholder: '100' },
        { name: 'candle1_high', label: 'Candle 1 High', type: 'number', placeholder: '105' },
        { name: 'candle3_low', label: 'Candle 3 Low', type: 'number', placeholder: '108' },
        { name: 'candle3_high', label: 'Candle 3 High', type: 'number', placeholder: '112' },
    ],
    calculate: (i) => {
        const { candle1_high, candle3_low } = i as { [key: string]: number };
        if (candle3_low > candle1_high) {
            return { label: 'Bullish FVG Range', value: `${formatNumber(candle1_high)} - ${formatNumber(candle3_low)}` };
        }
        // For bearish, user would swap high/low inputs
        const { candle1_low, candle3_high } = i as { [key:string]: number };
         if (candle1_low > candle3_high) {
            return { label: 'Bearish FVG Range', value: `${formatNumber(candle3_high)} - ${formatNumber(candle1_low)}` };
        }
        return { label: 'Result', value: 'No Fair Value Gap detected.' };
    }
};