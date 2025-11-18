import type { Calculator } from '../../types';
import { dcfCalculator } from './individual/valuation/dcf';
import { npvIrrCalculator } from './individual/valuation/npvIrr';
import { capmCalculator } from './individual/valuation/capm';
import { cashFlowDiscountingCalculator } from './individual/valuation/cashFlowDiscounting';

export const investmentValuationCalculators: Calculator[] = [
    dcfCalculator,
    npvIrrCalculator,
    capmCalculator,
    cashFlowDiscountingCalculator,
];
