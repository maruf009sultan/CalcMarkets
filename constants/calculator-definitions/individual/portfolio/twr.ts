import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';

export const twrCalculator: Calculator = {
    id: 'twr-calculator',
    name: 'Time-Weighted Return (TWR)',
    description: 'Calculate TWR, which measures portfolio performance independent of cash flows.',
    category: 'Portfolio Strategy',
    inputs: [
        { name: 'periods', label: 'Period Data (Start Value, End Value)', type: 'textarea', placeholder: '10000,11000\n11500,12000\n11800,13000', info: 'One period per line: Start Value, End Value. New lines imply cash flows between periods.' },
    ],
    calculate: (i) => {
        const lines = (i.periods as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No periods entered.' };
        
        let productOfReturns = 1;

        for (const line of lines) {
            const parts = line.split(',');
            if (parts.length !== 2) return { error: `Invalid format for line: "${line}"` };
            const startVal = parseFloat(parts[0]);
            const endVal = parseFloat(parts[1]);
            if (isNaN(startVal) || isNaN(endVal) || startVal <= 0) return { error: `Invalid number in line: "${line}"` };
            
            const holdingPeriodReturn = endVal / startVal;
            productOfReturns *= holdingPeriodReturn;
        }

        const twr = Math.pow(productOfReturns, 1 / lines.length) - 1;
        const totalReturn = productOfReturns - 1;

        return [
            { label: 'Total Return (Geometric)', value: formatPercent(totalReturn) },
            { label: 'Annualized TWR', value: formatPercent(twr) },
        ];
    },
};
