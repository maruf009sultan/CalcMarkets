import type { Calculator } from '../../types';
import { arimaForecastingCalculator } from './individual/quantitativeFinance/arima';
import { rollingRegressionBetaCalculator } from './individual/quantitativeFinance/rollingRegressionBeta';
import { correlationMatrixGeneratorCalculator } from './individual/quantitativeFinance/correlationMatrix';
import { maxDrawdownClustersCalculator } from './individual/quantitativeFinance/maxDrawdownClusters';

export const quantitativeFinanceCalculators: Calculator[] = [
    arimaForecastingCalculator,
    rollingRegressionBetaCalculator,
    correlationMatrixGeneratorCalculator,
    maxDrawdownClustersCalculator,
];
