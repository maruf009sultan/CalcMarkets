import type { Calculator } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const weatherDerivativesCalculator: Calculator = {
    id: 'weather-derivatives',
    name: 'Weather Derivatives (HDD/CDD)',
    description: 'Calculate the payout of a heating/cooling degree day futures contract.',
    category: 'Commodities & Niche',
    inputs: [
        { name: 'hdd_cdd_index', label: 'Final HDD/CDD Index Value', type: 'number', placeholder: '850' },
        { name: 'strike', label: 'Strike Level', type: 'number', placeholder: '800' },
        { name: 'tickValue', label: 'Value per Index Point ($)', type: 'number', placeholder: '20' },
        { name: 'position', label: 'Position (Long/Short)', type: 'text', placeholder: 'Long', info: 'Enter "Long" or "Short"' },
    ],
    calculate: (i) => {
        const { hdd_cdd_index, strike, tickValue } = i as { [key: string]: number };
        const position = (i.position as string).toLowerCase();
        let payout = 0;
        if (position === 'long') {
            payout = (hdd_cdd_index - strike) * tickValue;
        } else if (position === 'short') {
            payout = (strike - hdd_cdd_index) * tickValue;
        } else {
            return { error: 'Position must be "Long" or "Short".' };
        }
        return { label: 'Contract Payout', value: formatCurrency(payout) };
    }
};