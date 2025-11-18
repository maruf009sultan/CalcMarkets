import React, { useState, useMemo } from 'react';
import { CALCULATORS, CATEGORIES } from './constants/calculators';
import type { Calculator } from './types';
import { CalculatorHost } from './components/CalculatorHost';

const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-900 border border-slate-700 rounded-lg max-w-2xl w-full p-6 sm:p-8 space-y-4"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-white">About CalcMarkets</h2>
                <div className="text-slate-400 max-h-[60vh] overflow-y-auto pr-3">
                    <p className="mb-4">
                        <strong>CalcMarkets</strong> is a comprehensive, lightweight, and offline-first toolkit designed for traders, investors, and financial analysts. Every calculator is built to be precise, fast, and easy to use.
                    </p>
                    <h3 className="font-semibold text-slate-200 mb-2">How to Use</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Select a Calculator:</strong> Use the category filters or the search bar to find a specific tool by name or description, then click on its card.</li>
                        <li><strong>Enter Your Data:</strong> Fill in the required input fields. Many fields have default values or placeholders to guide you. Some inputs may accept comma-separated lists of numbers for series data.</li>
                        <li><strong>Calculate:</strong> Press the "Calculate" button to see the results instantly. The results will appear on the right side.</li>
                        <li><strong>Go Back:</strong> Use the "Back to all calculators" button to return to the main grid.</li>
                    </ul>
                     <p className="mt-4">
                        All calculations happen directly in your browser, ensuring your data remains private and the app works perfectly even without an internet connection.
                    </p>
                </div>
                 <button 
                    onClick={onClose} 
                    className="w-full mt-4 bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition-all duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [selectedCalculator, setSelectedCalculator] = useState<Calculator | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

    const categoryCounts = useMemo(() => {
        const counts: { [key: string]: number } = { All: CALCULATORS.length };
        CALCULATORS.forEach(calc => {
            counts[calc.category] = (counts[calc.category] || 0) + 1;
        });
        return counts;
    }, []);

    const filteredCalculators = useMemo(() => {
        let calculators = CALCULATORS;

        if (selectedCategory !== 'All') {
            calculators = calculators.filter(calc => calc.category === selectedCategory);
        }

        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            calculators = calculators.filter(calc =>
                calc.name.toLowerCase().includes(lowercasedTerm) ||
                calc.description.toLowerCase().includes(lowercasedTerm)
            );
        }

        return calculators;
    }, [searchTerm, selectedCategory]);
    
    const ChartBarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
    );

    const CalculatorIcon = () => (
        <div className="bg-slate-800/50 p-3 rounded-lg mr-4 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M9 11h.01M12 11h.01M15 11h.01M5.75 3h12.5a2.75 2.75 0 012.75 2.75v12.5a2.75 2.75 0 01-2.75 2.75H5.75A2.75 2.75 0 013 18.25V5.75A2.75 2.75 0 015.75 3z" />
            </svg>
        </div>
    );

    if (selectedCalculator) {
        return (
            <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-slate-950 overflow-y-auto min-h-screen">
                <CalculatorHost 
                    calculator={selectedCalculator} 
                    key={selectedCalculator.id} 
                    onBack={() => setSelectedCalculator(null)}
                />
            </main>
        );
    }

    return (
        <div className="min-h-screen font-sans">
             <style>
            {`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}
            </style>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-12">
                    <div className="inline-flex items-center justify-center bg-indigo-500/10 text-indigo-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                        <ChartBarIcon />
                        Professional Trading Tools
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight">CalcMarkets</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                        Professional financial calculators for Forex, Crypto, Options, Stocks, and more. Free, accurate, and always available.
                    </p>
                    <div className="mt-8 max-w-xl mx-auto">
                        <div className="relative">
                           <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                <svg className="h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search calculators..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>
                    </div>
                </header>

                <div className="mb-10 border-b border-slate-800">
                     <div className="flex items-center space-x-2 overflow-x-auto pb-4 -mb-px no-scrollbar">
                        {['All', ...CATEGORIES].map(category => (
                            categoryCounts[category] > 0 && (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-md whitespace-nowrap transition-colors duration-200 ${
                                        selectedCategory === category
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                                    }`}
                                >
                                    {category} ({categoryCounts[category]})
                                </button>
                            )
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCalculators.map(calc => (
                        <button
                            key={calc.id}
                            onClick={() => setSelectedCalculator(calc)}
                            className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-left hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <div className="flex items-start">
                                <CalculatorIcon />
                                <div>
                                    <h3 className="font-bold text-white">{calc.name}</h3>
                                    <p className="text-sm text-slate-400 mt-1">{calc.description}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                 {filteredCalculators.length === 0 && (
                    <div className="text-center py-16 text-slate-500">
                        <p className="text-lg font-semibold">No calculators found</p>
                        <p>Try adjusting your search or category filter.</p>
                    </div>
                 )}

                 <footer className="mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500 space-y-2">
                    <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-indigo-400 transition">
                        About / How to Use
                    </button>
                    <p>
                        Credits: <a href="https://github.com/maruf009sultan/" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-400 transition">maruf009sultan</a>
                    </p>
                </footer>
            </main>
            {isAboutModalOpen && <AboutModal onClose={() => setIsAboutModalOpen(false)} />}
        </div>
    );
};

export default App;
