import type { Calculator } from '../../../../types';
import { formatPercent } from '../../../../utils/helpers';
import { bisection } from '../../../../utils/helpers';

export const bondYtmCalculator: Calculator = {
    id: 'bond-ytm',
    name: 'Bond Yield to Maturity (YTM)',
    description: 'Estimate the total return anticipated on a bond if it is held until it matures.',
    category: 'Stocks & Bonds',
    inputs: [
        { name: 'currentPrice', label: 'Current Bond Price', type: 'number', placeholder: '950' },
        { name: 'faceValue', label: 'Bond Face Value (Par)', type: 'number', placeholder: '1000' },
        { name: 'couponRate', label: 'Annual Coupon Rate (%)', type: 'number', placeholder: '5' },
        { name: 'years', label: 'Years to Maturity', type: 'number', placeholder: '10' },
    ],
    calculate: (i) => {
        const C = (i.couponRate as number) / 100 * (i.faceValue as number);
        const F = i.faceValue as number;
        const P = i.currentPrice as number;
        const n = i.years as number;
        if (n <= 0) return { error: 'Years to maturity must be positive.' };
        
        // Function to calculate the bond's price for a given yield
        const calculateBondPrice = (rate: number): number => {
            let pvCoupons = 0;
            // Discount each coupon payment
            for (let t = 1; t <= n; t++) {
                pvCoupons += C / Math.pow(1 + rate, t);
            }
            // Discount the face value
            const pvFaceValue = F / Math.pow(1 + rate, n);
            return pvCoupons + pvFaceValue;
        };

        // Use a bisection solver to find the yield that makes the calculated price equal to the market price
        const ytm = bisection(calculateBondPrice, P, 0, 1, 1e-6, 100);

        if (ytm >= 0.99) {
             return { error: 'Could not converge to a solution. Please check input values.' };
        }

        return { label: 'Yield to Maturity (YTM)', value: formatPercent(ytm) };
    },
};