import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const hedgePositionCalculator: Calculator = {
    id: 'hedge-position',
    name: 'Hedge Position',
    description: 'Calculate the size of a hedge position needed to neutralize delta.',
    category: 'Risk Management',
    inputs: [
        { name: 'primaryPositionValue', label: 'Primary Position Value', type: 'number', placeholder: '100000' },
        { name: 'primaryPositionDelta', label: 'Primary Position Delta', type: 'number', placeholder: '1', info: 'For stocks, delta is 1' },
        { name: 'hedgeInstrumentPrice', label: 'Hedge Instrument Price', type: 'number', placeholder: '350' },
        { name: 'hedgeInstrumentDelta', label: 'Hedge Instrument Delta', type: 'number', placeholder: '-0.5', info: 'e.g., delta of a put option' },
    ],
    calculate: (i) => {
        const { primaryPositionValue, primaryPositionDelta, hedgeInstrumentPrice, hedgeInstrumentDelta } = i as { [key: string]: number };
        if (hedgeInstrumentDelta === 0) return { error: 'Hedge instrument delta cannot be zero.' };
        const totalDelta = primaryPositionValue * primaryPositionDelta;
        const hedgeUnits = -totalDelta / (hedgeInstrumentPrice * hedgeInstrumentDelta);
        return { label: 'Units of Hedge Instrument Needed', value: formatNumber(hedgeUnits, 4) };
    }
};