import type { Calculator } from '../../types';
import { profitLossCalculator } from './individual/general/profitLoss';
import { averagePriceCalculator } from './individual/general/averagePrice';
import { breakEvenPriceCalculator } from './individual/general/breakEvenPrice';
import { commissionCalculator } from './individual/general/commission';
import { changeCalculator } from './individual/general/change';
import { fibonacciCalculator } from './individual/general/fibonacci';
import { leverageCalculator } from './individual/general/leverage';
import { pivotPointsCalculator } from './individual/general/pivotPoints';
import { spreadCalculator } from './individual/general/spread';
import { atrCalculator } from './individual/general/atr';

export const generalTradingCalculators: Calculator[] = [
    profitLossCalculator,
    averagePriceCalculator,
    breakEvenPriceCalculator,
    commissionCalculator,
    changeCalculator,
    fibonacciCalculator,
    leverageCalculator,
    pivotPointsCalculator,
    spreadCalculator,
    atrCalculator,
];
