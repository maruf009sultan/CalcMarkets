import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const ichimokuCloudCalculator: Calculator = {
    id: 'ichimoku-cloud',
    name: 'Ichimoku Cloud Levels',
    description: 'Calculate all five components of the Ichimoku Kinko Hyo indicator.',
    category: 'Advanced Trading Analytics',
    inputs: [
        { name: 'data', label: 'Candle Data (High,Low)', type: 'textarea', placeholder: '...', info: 'Enter at least 52 periods of High,Low data on new lines.' },
    ],
    calculate: (i) => {
        const lines = (i.data as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length < 52) return { error: `At least 52 periods of data are required.` };

        const candles = lines.map(line => {
            const [h, l] = line.split(',').map(parseFloat);
            return { high: h, low: l };
        });

        const closes = lines.map(line => { // Assuming close is not provided, use midpoint
            const [h, l] = line.split(',').map(parseFloat);
            return (h+l)/2;
        });

        const getHighLow = (data: {high: number, low: number}[]) => {
            const high = Math.max(...data.map(c => c.high));
            const low = Math.min(...data.map(c => c.low));
            return { high, low };
        }

        // Tenkan-sen (Conversion Line): (9-period high + 9-period low)/2))
        const tenkanData = candles.slice(-9);
        const { high: high9, low: low9 } = getHighLow(tenkanData);
        const tenkanSen = (high9 + low9) / 2;

        // Kijun-sen (Base Line): (26-period high + 26-period low)/2))
        const kijunData = candles.slice(-26);
        const { high: high26, low: low26 } = getHighLow(kijunData);
        const kijunSen = (high26 + low26) / 2;

        // Senkou Span A (Leading Span A): (Conversion Line + Base Line)/2))
        const senkouSpanA = (tenkanSen + kijunSen) / 2;

        // Senkou Span B (Leading Span B): (52-period high + 52-period low)/2))
        const senkouBData = candles.slice(-52);
        const { high: high52, low: low52 } = getHighLow(senkouBData);
        const senkouSpanB = (high52 + low52) / 2;

        // Chikou Span (Lagging Span): Close plotted 26 days in the past
        const chikouSpan = closes[closes.length - 26];

        return [
            { label: 'Tenkan-sen (Conversion Line)', value: formatNumber(tenkanSen, 4) },
            { label: 'Kijun-sen (Base Line)', value: formatNumber(kijunSen, 4) },
            { label: 'Senkou Span A (plotted 26 periods ahead)', value: formatNumber(senkouSpanA, 4) },
            { label: 'Senkou Span B (plotted 26 periods ahead)', value: formatNumber(senkouSpanB, 4) },
            { label: 'Chikou Span (current value from 26 periods ago)', value: formatNumber(chikouSpan, 4) },
        ];
    },
};
