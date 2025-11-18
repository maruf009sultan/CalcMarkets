import type { Calculator } from '../../../../types';
import { formatNumber } from '../../../../utils/helpers';

export const priceElasticityCalculator: Calculator = {
    id: 'price-elasticity',
    name: 'Price Elasticity',
    description: 'Calculate the price elasticity of demand between two price/quantity points.',
    category: 'Advanced Market Analysis',
    inputs: [
        { name: 'price1', label: 'Initial Price', type: 'number', placeholder: '10' },
        { name: 'quantity1', label: 'Initial Quantity Demanded', type: 'number', placeholder: '1000' },
        { name: 'price2', label: 'New Price', type: 'number', placeholder: '12' },
        { name: 'quantity2', label: 'New Quantity Demanded', type: 'number', placeholder: '800' },
    ],
    calculate: (i) => {
        const { price1, quantity1, price2, quantity2 } = i as { [key: string]: number };
        if (price1 === price2 || quantity1 === quantity2) return { error: 'Prices and quantities must change to calculate elasticity.' };
        const percentChangeQ = (quantity2 - quantity1) / ((quantity1 + quantity2) / 2);
        const percentChangeP = (price2 - price1) / ((price1 + price2) / 2);
        if (percentChangeP === 0) return { error: 'Price change cannot be zero.' };
        const elasticity = percentChangeQ / percentChangeP;
        let interpretation = 'Unit Elastic';
        if (Math.abs(elasticity) > 1) interpretation = 'Elastic (demand is sensitive to price)';
        if (Math.abs(elasticity) < 1) interpretation = 'Inelastic (demand is not sensitive to price)';
        return [
            { label: 'Price Elasticity of Demand', value: formatNumber(elasticity, 3) },
            { label: 'Interpretation', value: interpretation },
        ];
    }
};