import type { Calculator } from '../types';
import { cryptoCalculators } from './calculator-definitions/crypto';
import { forexCalculators } from './calculator-definitions/forex';
import { generalTradingCalculators } from './calculator-definitions/general';
import { marketAnalysisCalculators } from './calculator-definitions/marketAnalysis';
import { optionsCalculators } from './calculator-definitions/options';
import { portfolioStrategyCalculators } from './calculator-definitions/portfolio';
import { riskManagementCalculators } from './calculator-definitions/riskManagement';
import { stocksAndBondsCalculators } from './calculator-definitions/stocks';
import { investmentValuationCalculators } from './calculator-definitions/valuation';
import { commoditiesCalculators } from './calculator-definitions/commodities';
import { metaCalculators } from './calculator-definitions/meta';
import { orderFlowCalculators } from './calculator-definitions/orderFlow';
import { advancedTradingAnalyticsCalculators } from './calculator-definitions/advancedTradingAnalytics';
import { quantitativeFinanceCalculators } from './calculator-definitions/quantitativeFinance';
import { taxesAndComplianceCalculators } from './calculator-definitions/taxesAndCompliance';
import { backtestingCalculators } from './calculator-definitions/backtesting';

export const CATEGORIES = [
    'Meta Calculators',
    'General Trading',
    'Order Flow & Microstructure',
    'Advanced Market Analysis',
    'Advanced Trading Analytics',
    'Risk Management',
    'Portfolio Strategy',
    'Quantitative Finance',
    'Backtesting & Strategy Engineering',
    'Investment Valuation',
    'Stocks & Bonds',
    'Forex & Futures',
    'Options',
    'Cryptocurrency',
    'Taxes & Compliance',
    'Commodities & Niche',
];

export const CALCULATORS: Calculator[] = [
    ...metaCalculators,
    ...generalTradingCalculators,
    ...orderFlowCalculators,
    ...marketAnalysisCalculators,
    ...advancedTradingAnalyticsCalculators,
    ...riskManagementCalculators,
    ...portfolioStrategyCalculators,
    ...quantitativeFinanceCalculators,
    ...backtestingCalculators,
    ...investmentValuationCalculators,
    ...stocksAndBondsCalculators,
    ...forexCalculators,
    ...optionsCalculators,
    ...cryptoCalculators,
    ...taxesAndComplianceCalculators,
    ...commoditiesCalculators,
];
