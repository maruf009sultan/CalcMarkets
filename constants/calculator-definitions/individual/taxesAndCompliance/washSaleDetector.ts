import type { Calculator, CalculationResult } from '../../../../types';
import { formatCurrency } from '../../../../utils/helpers';

export const washSaleDetectorCalculator: Calculator = {
    id: 'wash-sale-detector',
    name: 'Wash Sale Detector',
    description: 'Identify potential wash sales from a series of transactions.',
    category: 'Taxes & Compliance',
    inputs: [
        { name: 'trades', label: 'Transactions (Date,Type,Qty,Price)', type: 'textarea', placeholder: '2023-01-10,BUY,100,50\n2023-02-15,SELL,100,45\n2023-03-01,BUY,100,48', info: 'One trade per line: YYYY-MM-DD, BUY/SELL, Quantity, Price' },
    ],
    calculate: (i): CalculationResult => {
        const lines = (i.trades as string).split('\n').filter(l => l.trim() !== '');
        if (lines.length < 2) return { error: 'At least two transactions are needed.' };
        
        const trades = lines.map((line, index) => {
            const parts = line.split(',');
            if (parts.length !== 4) throw new Error(`Invalid format on line ${index+1}`);
            const type = parts[1].toUpperCase().trim();
            if (type !== 'BUY' && type !== 'SELL') throw new Error(`Invalid transaction type on line ${index+1}: must be BUY or SELL`);
            return {
                date: new Date(parts[0]),
                type: type,
                qty: parseFloat(parts[2]),
                price: parseFloat(parts[3]),
                id: index
            };
        }).sort((a, b) => a.date.getTime() - b.date.getTime());

        const washSales = [];
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        
        const buyLots = trades.filter(t => t.type === 'BUY').map(t => ({...t, remainingQty: t.qty}));

        for (const sellTrade of trades.filter(t => t.type === 'SELL')) {
            let qtyToDetermineBasis = sellTrade.qty;
            let costBasisForSale = 0;
            let tempBuyLots = JSON.parse(JSON.stringify(buyLots)); // Use a temp copy for each sale

            // Simple FIFO to calculate cost basis for this specific sale
            for (const buyLot of tempBuyLots) {
                 if (buyLot.date.getTime() > sellTrade.date.getTime()) continue; // Only use lots bought before the sale
                 if (buyLot.remainingQty > 0) {
                    const qtyFromThisLot = Math.min(qtyToDetermineBasis, buyLot.remainingQty);
                    costBasisForSale += qtyFromThisLot * buyLot.price;
                    buyLot.remainingQty -= qtyFromThisLot;
                    qtyToDetermineBasis -= qtyFromThisLot;

                    if (qtyToDetermineBasis <= 0.00000001) break;
                }
            }

            const proceeds = sellTrade.qty * sellTrade.price;
            const lossAmount = costBasisForSale - proceeds;

            if (lossAmount > 0) { // A loss occurred
                const saleDate = sellTrade.date.getTime();
                
                const surroundingBuys = trades.filter(t => 
                    t.type === 'BUY' &&
                    Math.abs(t.date.getTime() - saleDate) <= thirtyDays
                );
                
                if (surroundingBuys.length > 0) {
                    washSales.push({ 
                        sale: sellTrade, 
                        loss: lossAmount,
                        triggeringBuy: surroundingBuys[0]
                    });
                }
            }
        }
        
        if(washSales.length === 0) {
            return { label: 'Result', value: 'No potential wash sales detected. Note: This is a simplified FIFO check and does not track cost basis adjustments across sales.' };
        }

        const headers = ['Sale Date', 'Disallowed Loss', 'Triggering Buy Date'];
        const rows = washSales.map(ws => [
            ws.sale.date.toISOString().split('T')[0],
            formatCurrency(ws.loss),
            ws.triggeringBuy.date.toISOString().split('T')[0]
        ]);

        return {
            label: 'Potential Wash Sales Identified (FIFO)',
            table: { headers, rows }
        };
    },
};
