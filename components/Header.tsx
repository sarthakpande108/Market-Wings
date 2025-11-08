import React from 'react';

const WingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

type Page = 'home' | 'about';

interface HeaderProps {
    currentPage: Page;
    setPage: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setPage }) => {
    const navLinkClasses = (page: Page) => 
        `px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentPage === page 
                ? 'bg-sky-500/20 text-sky-300' 
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
        }`;

    return (
        <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <WingIcon />
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
                            MarketWings
                        </h1>
                        <p className="text-xs text-sky-400 font-medium tracking-wider">AI CHART ANALYZER</p>
                    </div>
                </div>
                <nav className="flex items-center gap-2">
                    <button onClick={() => setPage('home')} className={navLinkClasses('home')}>
                        Analyzer
                    </button>
                    <button onClick={() => setPage('about')} className={navLinkClasses('about')}>
                        About
                    </button>
                </nav>
            </div>
        </header>
    );
};