import type { Calculator } from '../../../../types';
import { formatNumber, formatPercent } from '../../../../utils/helpers';

export const ammSlippageCalculator: Calculator = {
    id: 'amm-slippage',
    name: 'AMM Slippage',
    description: 'Estimate the price slippage in a constant product (x*y=k) automated market maker pool.',
    category: 'Cryptocurrency',
    inputs: [
        { name: 'tokenA_balance', label: 'Token A Pool Balance', type: 'number', placeholder: '1000' },
        { name: 'tokenB_balance', label: 'Token B Pool Balance', type: 'number', placeholder: '1000000' },
        { name: 'tradeAmountA', label: 'Amount of Token A to Trade', type: 'number', placeholder: '50' },
    ],
    calculate: (i) => {
        const { tokenA_balance, tokenB_balance, tradeAmountA } = i as { [key: string]: number };
        if (tokenA_balance <= 0 || tokenB_balance <= 0) return { error: 'Pool balances must be positive.' };
        
        const k = tokenA_balance * tokenB_balance;
        const priceBefore = tokenB_balance / tokenA_balance;
        
        const newBalanceA = tokenA_balance + tradeAmountA;
        const newBalanceB = k / newBalanceA;
        const amountOut = tokenB_balance - newBalanceB;
        
        if (amountOut <= 0) return { error: "Trade size may be too large for the pool." };
        
        const effectivePrice = amountOut / tradeAmountA;
        const slippage = 1 - (effectivePrice / priceBefore);

        return [
            { label: 'Tokens B Received', value: formatNumber(amountOut, 6) },
            { label: 'Effective Price (B per A)', value: formatNumber(effectivePrice, 4) },
            { label: 'Price Slippage', value: formatPercent(slippage) },
        ];
    }
};