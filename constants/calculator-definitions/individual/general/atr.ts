import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const atrCalculator: Calculator = {
    id: 'atr',
    name: 'ATR (Average True Range)',
    description: 'Calculate the Average True Range as a measure of market volatility.',
    category: 'General Trading',
    inputs: [
        { name: 'data', label: 'Candle Data (High,Low,Close)', type: 'textarea', placeholder: '102,98,101\n103,100,102\n104,101,103', info: 'Enter each period on a new line: High,Low,Close' },
        { name: 'period', label: 'ATR Period', type: 'number', placeholder: '14' },
    ],
    calculate: (i) => {
        const lines = (i.data as string).split('\n').filter(l => l.trim() !== '');
        const period = i.period as number;
        if (lines.length < period) return { error: `Not enough data for period ${period}.` };

        const candles = lines.map(line => {
            const [h, l, c] = line.split(',').map(parseFloat);
            return { high: h, low: l, close: c };
        });

        const trueRanges = [];
        for (let j = 1; j < candles.length; j++) {
            const tr1 = candles[j].high - candles[j].low;
            const tr2 = Math.abs(candles[j].high - candles[j - 1].close);
            const tr3 = Math.abs(candles[j].low - candles[j - 1].close);
            trueRanges.push(Math.max(tr1, tr2, tr3));
        }

        if (trueRanges.length === 0) return { error: 'Not enough data to calculate True Range.' };
        
        const relevantTRs = trueRanges.slice(-period);
        const atr = relevantTRs.reduce((a, b) => a + b, 0) / relevantTRs.length;

        return { label: `ATR (${period})`, value: formatNumber(atr, 4) };
    },
};