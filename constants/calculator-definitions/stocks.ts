import type { Calculator } from '../../types';
import { dividendYieldCalculator } from './individual/stocks/dividendYield';
import { epsCalculator } from './individual/stocks/eps';
import { stockRoiCalculator } from './individual/stocks/stockRoi';
import { stockSplitCalculator } from './individual/stocks/stockSplit';
import { bondYtmCalculator } from './individual/stocks/bondYtm';
import { couponPaymentCalculator } from './individual/stocks/couponPayment';

export const stocksAndBondsCalculators: Calculator[] = [
    dividendYieldCalculator,
    epsCalculator,
    stockRoiCalculator,
    stockSplitCalculator,
    bondYtmCalculator,
    couponPaymentCalculator,
];
