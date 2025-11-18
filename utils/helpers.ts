// --- Formatting Helpers ---
export const formatCurrency = (val: number, currency = 'USD') => new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(val);
export const formatNumber = (val: number, digits = 2) => val.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits });
export const formatPercent = (val: number) => `${formatNumber(val * 100)}%`;

// --- Parsing Helpers ---
export const parseSeries = (input: string): number[] => {
    if (!input || typeof input !== 'string') return [];
    return input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
};

// --- Statistical Helpers ---
export const sum = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0);
export const mean = (arr: number[]) => arr.length === 0 ? 0 : sum(arr) / arr.length;
export const stdDev = (arr: number[]) => {
    if (arr.length < 2) return 0;
    const mu = mean(arr);
    const diffSq = arr.map(n => Math.pow(n - mu, 2));
    const variance = sum(diffSq) / (arr.length - 1); // Sample standard deviation
    return Math.sqrt(variance);
};
export const percentile = (arr: number[], p: number): number => {
    const sorted = [...arr].sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    if (Number.isInteger(index)) return sorted[index];
    const lower = sorted[Math.floor(index)];
    const upper = sorted[Math.ceil(index)];
    return lower + (upper - lower) * (index - Math.floor(index));
};
export const correlation = (arr1: number[], arr2: number[]): number => {
    if (arr1.length !== arr2.length || arr1.length < 2) return NaN;
    const n = arr1.length;
    const mean1 = mean(arr1);
    const mean2 = mean(arr2);
    const stdDev1 = stdDev(arr1);
    const stdDev2 = stdDev(arr2);
    if (stdDev1 === 0 || stdDev2 === 0) return NaN;
    const covariance = sum(arr1.map((x, i) => (x - mean1) * (arr2[i] - mean2))) / (n - 1);
    return covariance / (stdDev1 * stdDev2);
};
export const norm_pdf = (x: number): number => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
export const omegaRatio = (returns: number[], threshold: number): number => {
    const gains = returns.filter(r => r > threshold).map(r => r - threshold);
    const losses = returns.filter(r => r < threshold).map(r => threshold - r);
    const sumGains = sum(gains);
    const sumLosses = sum(losses);
    if (sumLosses === 0) return Infinity;
    return sumGains / sumLosses;
};
export const rolling = <T>(arr: T[], period: number, func: (slice: T[]) => any): any[] => {
    if (arr.length < period) return [];
    const results = [];
    for (let i = period - 1; i < arr.length; i++) {
        results.push(func(arr.slice(i - period + 1, i + 1)));
    }
    return results;
};
export const linearRegression = (points: {x: number, y: number}[]) => {
    const n = points.length;
    if (n < 2) return { slope: NaN, intercept: NaN, rSquared: NaN };
    const sumX = sum(points.map(p => p.x));
    const sumY = sum(points.map(p => p.y));
    const sumXY = sum(points.map(p => p.x * p.y));
    const sumX2 = sum(points.map(p => p.x * p.x));
    const sumY2 = sum(points.map(p => p.y * p.y));

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    const r = (n * sumXY - sumX * sumY) / Math.sqrt((n*sumX2 - sumX*sumX)*(n*sumY2 - sumY*sumY));
    
    return { slope, intercept, rSquared: r*r };
};
export const solveIRR = (cashflows: number[], guess = 0.1): number => {
    const maxIterations = 100;
    const tolerance = 1e-7;
    let x0 = guess;

    for (let i = 0; i < maxIterations; i++) {
        let fValue = 0;
        let fDerivative = 0;
        for (let t = 0; t < cashflows.length; t++) {
            fValue += cashflows[t] / Math.pow(1 + x0, t);
            fDerivative += -t * cashflows[t] / Math.pow(1 + x0, t + 1);
        }

        if (Math.abs(fDerivative) < 1e-10) break; // Avoid division by zero
        
        const x1 = x0 - fValue / fDerivative;
        if (Math.abs(x1 - x0) < tolerance) return x1;
        x0 = x1;
    }
    
    // Fallback to bisection if Newton-Raphson fails to converge
    const npvFunc = (rate: number) => sum(cashflows.map((cf, t) => cf / Math.pow(1 + rate, t)));
    return bisection(npvFunc, 0, -0.99, 2.0, 1e-6, 100);
};

// --- Financial Modeling Helpers ---

/**
 * Cumulative Distribution Function for Standard Normal Distribution (Hart approximation)
 * @param x The value to evaluate
 * @returns The probability P(Z <= x)
 */
export const cdf = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
};

/**
 * Calculates the theoretical price of a European-style option using the Black-Scholes model.
 * @param S - Current stock price
 * @param K - Strike price
 * @param T - Time to expiration in years
 * @param v - Volatility as a decimal (e.g., 0.2 for 20%)
 * @param r - Risk-free interest rate as a decimal (e.g., 0.05 for 5%)
 * @param optionType - 'call' or 'put'
 * @returns The theoretical price of the option
 */
export const blackScholes = (S: number, K: number, T: number, v: number, r: number, optionType: 'call' | 'put'): number => {
    if (S <= 0 || K <= 0 || T <= 0 || v <= 0) return 0;
    const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
    const d2 = d1 - v * Math.sqrt(T);

    if (optionType === 'call') {
        return S * cdf(d1) - K * Math.exp(-r * T) * cdf(d2);
    } else { // put
        return K * Math.exp(-r * T) * cdf(-d2) - S * cdf(-d1);
    }
};

/**
 * Iterative solver for finding roots of a function.
 * @param func The function for which to find a root (should take one number and return a number).
 * @param target The target value (we're solving func(x) - target = 0).
 * @param low The lower bound of the search range.
 * @param high The upper bound of the search range.
 * @param tolerance The desired precision.
 * @param maxIterations The maximum number of iterations.
 * @returns The value of x for which func(x) is close to target.
 */
export const bisection = (func: (x: number) => number, target: number, low: number, high: number, tolerance = 1e-5, maxIterations = 100): number => {
    let mid = 0;
    for (let i = 0; i < maxIterations; i++) {
        mid = (low + high) / 2;
        if (mid === low || mid === high) return mid; // Avoid infinite loop if precision limit is reached
        const estimate = func(mid);
        if (Math.abs(estimate - target) < tolerance) return mid;
        if (estimate > target) high = mid;
        else low = mid;
    }
    return mid;
};


/**
 * Calculates multiple options greeks
 */
export const calculateGreeks = (S: number, K: number, T: number, v: number, r: number) => {
    if (S <= 0 || K <= 0 || T <= 0 || v <= 0) {
        return { deltaCall: 0, deltaPut: 0, gamma: 0, thetaCall: 0, thetaPut: 0, vega: 0, vanna: 0, charm: 0 };
    }
    const d1 = (Math.log(S / K) + (r + v * v / 2) * T) / (v * Math.sqrt(T));
    const d2 = d1 - v * Math.sqrt(T);
    const nd1_pdf = norm_pdf(d1);

    const deltaCall = cdf(d1);
    const gamma = nd1_pdf / (S * v * Math.sqrt(T));
    const vega = S * nd1_pdf * Math.sqrt(T);
    const thetaCall = -((S * nd1_pdf * v) / (2 * Math.sqrt(T))) - r * K * Math.exp(-r * T) * cdf(d2);
    const thetaPut = thetaCall + r * K * Math.exp(-r * T);

    // Second order greeks
    const vanna = (vega / S) * (1 - d1 / (v * Math.sqrt(T)));
    const charm = -cdf(d1) * (r/T - d2*v / (2*T)) - nd1_pdf * (v / (2*Math.sqrt(T)));
    
    return {
        deltaCall,
        deltaPut: deltaCall - 1,
        gamma,
        thetaCall,
        thetaPut,
        vega,
        vanna,
        charm,
    };
};
