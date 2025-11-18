import type { Calculator } from '../../../../types';
import { formatNumber, mean } from '../../../../utils/helpers';

export const keltnerChannelCalculator: Calculator = {
    id: 'keltner-channel',
    name: 'Keltner Channel',
    description: 'Calculate the Keltner Channel bands using EMA and ATR.',
    category: 'Advanced Trading Analytics',
    inputs: [
        { name: 'data', label: 'Candle Data (High,Low,Close)', type: 'textarea', placeholder: '102,98,101\n103,100,102\n104,101,103...', info: 'Enter at least 20 periods of H,L,C data on new lines' },
        { name: 'emaPeriod', label: 'EMA Period', type: 'number', placeholder: '20' },
        { name: 'atrPeriod', label: 'ATR Period', type: 'number', placeholder: '10' },
        { name: 'multiplier', label: 'ATR Multiplier', type: 'number', placeholder: '2' },
    ],
    calculate: (i) => {
        const lines = (i.data as string).split('\n').filter(l => l.trim() !== '');
        const emaPeriod = i.emaPeriod as number;
        const atrPeriod = i.atrPeriod as number;
        const multiplier = i.multiplier as number;
        if (lines.length < emaPeriod || lines.length < atrPeriod) return { error: `Not enough data for the periods specified.` };

        const candles = lines.map(line => {
            const [h, l, c] = line.split(',').map(parseFloat);
            return { high: h, low: l, close: c };
        });

        // EMA Calculation
        const k = 2 / (emaPeriod + 1);
        const closes = candles.map(c => c.close);
        let ema = mean(closes.slice(0, emaPeriod));
        ema = closes.slice(emaPeriod).reduce((acc, price) => (price * k) + (acc * (1-k)), ema);
        
        // ATR Calculation
        const trueRanges = [];
        for (let j = 1; j < candles.length; j++) {
            const tr1 = candles[j].high - candles[j].low;
            const tr2 = Math.abs(candles[j].high - candles[j - 1].close);
            const tr3 = Math.abs(candles[j].low - candles[j - 1].close);
            trueRanges.push(Math.max(tr1, tr2, tr3));
        }
        const relevantTRs = trueRanges.slice(-atrPeriod);
        const atr = mean(relevantTRs);

        const upperBand = ema + (atr * multiplier);
        const lowerBand = ema - (atr * multiplier);

        return [
            { label: 'Upper Band', value: formatNumber(upperBand, 4) },
            { label: 'Middle Line (EMA)', value: formatNumber(ema, 4) },
            { label: 'Lower Band', value: formatNumber(lowerBand, 4) },
        ];
    },
};
