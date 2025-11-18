import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const orderFlowImbalanceCalculator: Calculator = {
    id: 'order-flow-imbalance',
    name: 'Order Flow Imbalance (OFI)',
    description: 'Calculate the imbalance between buying and selling pressure at the bid/ask.',
    category: 'Order Flow & Microstructure',
    inputs: [
        { name: 'bidPrice1', label: 'Previous Bid Price', type: 'number', placeholder: '100.00' },
        { name: 'bidSize1', label: 'Previous Bid Size', type: 'number', placeholder: '500' },
        { name: 'askPrice1', label: 'Previous Ask Price', type: 'number', placeholder: '100.05' },
        { name: 'askSize1', label: 'Previous Ask Size', type: 'number', placeholder: '400' },
        { name: 'bidPrice2', label: 'Current Bid Price', type: 'number', placeholder: '100.00' },
        { name: 'bidSize2', label: 'Current Bid Size', type: 'number', placeholder: '600' },
        { name: 'askPrice2', label: 'Current Ask Price', type: 'number', placeholder: '100.05' },
        { name: 'askSize2', label: 'Current Ask Size', type: 'number', placeholder: '300' },
    ],
    calculate: (i) => {
        const { bidPrice1, bidSize1, askPrice1, askSize1, bidPrice2, bidSize2, askPrice2, askSize2 } = i as { [key: string]: number };
        
        let buyPressure = 0;
        if (askPrice2 < askPrice1) { // Market buy hit previous ask
            buyPressure = askSize1;
        } else if (askPrice2 === askPrice1) {
            buyPressure = askSize2 - askSize1; // New limit orders or market buys
        }

        let sellPressure = 0;
        if (bidPrice2 > bidPrice1) { // Market sell hit previous bid
            sellPressure = bidSize1;
        } else if (bidPrice2 === bidPrice1) {
            sellPressure = bidSize2 - bidSize1; // New limit orders or market sells
        }

        const ofi = buyPressure - sellPressure;
        let interpretation = 'Neutral';
        if (ofi > 0) interpretation = `Positive Imbalance (Buyer Aggression: ${ofi})`;
        if (ofi < 0) interpretation = `Negative Imbalance (Seller Aggression: ${ofi})`;
        
        return [
            { label: 'Order Flow Imbalance (OFI)', value: formatNumber(ofi, 0), info: "Measures the net difference between aggressive buy orders (lifting the ask) and aggressive sell orders (hitting the bid) over a short interval." },
            { label: 'Interpretation', value: interpretation },
        ];
    },
};