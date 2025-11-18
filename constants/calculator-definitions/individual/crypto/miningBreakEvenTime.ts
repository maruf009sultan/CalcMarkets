import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const miningBreakEvenTimeCalculator: Calculator = {
    id: 'mining-break-even-time',
    name: 'Mining Break-Even Time',
    description: 'Estimate how long it will take for a mining rig to pay for itself.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'hardwareCost', label: 'Hardware Cost (USD)', type: 'number', placeholder: '5000' },
        { name: 'dailyProfit', label: 'Estimated Daily Profit (USD)', type: 'number', placeholder: '15', info: 'Calculate this using the Mining Profitability calculator first' },
    ],
    calculate: (i) => {
        const { hardwareCost, dailyProfit } = i as { [key: string]: number };
        if (dailyProfit <= 0) {
            return { label: 'Break-Even Time', value: 'Infinity (Not profitable)' };
        }

        const daysToBreakEven = hardwareCost / dailyProfit;

        return [
            { label: 'Break-Even Time (Days)', value: formatNumber(daysToBreakEven, 1) },
            { label: 'Break-Even Time (Months)', value: formatNumber(daysToBreakEven / 30.4, 1) },
        ];
    },
};
