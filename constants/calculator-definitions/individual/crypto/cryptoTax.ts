import type { Calculator } from '../../../../types';
import { formatCurrency, formatNumber } from '../../../../utils/helpers';

export const cryptoTaxCalculator: Calculator = {
    id: 'crypto-tax-advanced',
    name: 'Crypto Tax (FIFO/LIFO/HIFO/ACB)',
    description: 'Calculate capital gains for a crypto sale using various accounting methods.',
    category: 'Taxes & Compliance',
    inputs: [
        { name: 'method', label: 'Accounting Method', type: 'text', placeholder: 'FIFO', defaultValue: 'FIFO', info: 'Enter FIFO, LIFO, HIFO, or ACB' },
        { name: 'buys', label: 'Buy Lots (Quantity,Price)', type: 'textarea', placeholder: '0.5,30000\n0.2,40000\n0.3,35000', info: 'Enter each buy on a new line: Quantity,Price per coin' },
        { name: 'sellAmount', label: 'Amount of Coin to Sell', type: 'number', placeholder: '0.6' },
        { name: 'sellPrice', label: 'Sell Price per Coin', type: 'number', placeholder: '45000' },
    ],
    calculate: (i) => {
        const method = (i.method as string).toUpperCase();
        const lines = (i.buys as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length === 0) return { error: 'No buy lots entered.' };
        
        let lots = lines.map((line, index) => {
            const parts = line.split(',');
            if (parts.length !== 2) throw new Error(`Invalid format for buy lot: "${line}"`);
            const qty = parseFloat(parts[0]);
            const price = parseFloat(parts[1]);
            if (isNaN(qty) || isNaN(price) || qty <= 0 || price < 0) throw new Error(`Invalid numbers in buy lot: "${line}"`);
            return { qty, price, id: index };
        });

        let amountToSell = i.sellAmount as number;
        const sellPrice = i.sellPrice as number;
        let costBasis = 0;
        
        const totalBought = lots.reduce((sum, lot) => sum + lot.qty, 0);
        if (amountToSell > totalBought) {
            return { error: `Amount to sell (${formatNumber(amountToSell, 8)}) exceeds total quantity bought (${formatNumber(totalBought, 8)}).` };
        }

        if (method === 'ACB') {
             const totalCost = lots.reduce((sum, lot) => sum + (lot.qty * lot.price), 0);
             const averageCost = totalCost / totalBought;
             costBasis = amountToSell * averageCost;
        } else {
            if (method === 'LIFO') {
                lots.reverse();
            } else if (method === 'HIFO') {
                lots.sort((a, b) => b.price - a.price);
            } // FIFO is default order

            for (const lot of lots) {
                if (amountToSell <= 0.00000001) break;
                const qtyFromLot = Math.min(amountToSell, lot.qty);
                costBasis += qtyFromLot * lot.price;
                amountToSell -= qtyFromLot;
            }
        }
        
        const proceeds = (i.sellAmount as number) * sellPrice;
        const capitalGain = proceeds - costBasis;
        
        return [
            { label: 'Total Cost Basis', value: formatCurrency(costBasis) },
            { label: 'Total Proceeds', value: formatCurrency(proceeds) },
            { label: 'Capital Gain/Loss', value: formatCurrency(capitalGain) },
        ];
    }
};
