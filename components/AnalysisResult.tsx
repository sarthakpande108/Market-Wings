import React from 'react';
import type { AnalysisData, NewsSource, Recommendation, Sentiment } from '../types';

const recommendationStyles: Record<Recommendation, { bg: string; text: string; border: string; icon: React.ReactNode }> = {
  Buy: {
    bg: 'bg-teal-900/50', text: 'text-teal-300', border: 'border-teal-700',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
  },
  Sell: {
    bg: 'bg-rose-900/50', text: 'text-rose-300', border: 'border-rose-700',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
  },
  Hold: {
    bg: 'bg-slate-700/50', text: 'text-slate-300', border: 'border-slate-600',
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
  },
};

const sentimentStyles: Record<Sentiment, { bg: string; text: string; }> = {
    Positive: {bg: 'bg-teal-500/20', text: 'text-teal-400'},
    Negative: {bg: 'bg-rose-500/20', text: 'text-rose-400'},
    Neutral: {bg: 'bg-slate-500/20', text: 'text-slate-400'},
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode; className?: string, icon?: React.ReactNode }> = ({ title, children, className = '', icon }) => (
    <div className={`bg-slate-800/50 p-4 rounded-lg border border-slate-700 ${className}`}>
      <h3 className="text-sm font-semibold text-slate-400 mb-2 flex items-center gap-2">
          {icon}
          {title}
      </h3>
      <div className="text-slate-200">{children}</div>
    </div>
  );
  
const PatternIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>;
const SentimentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>;
const SummaryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const NewsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>;
const SourcesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;

export const AnalysisResult: React.FC<{ result: AnalysisData; sources: NewsSource[] | null }> = ({ result, sources }) => {
    const style = recommendationStyles[result.recommendation];

  return (
    <div className="mt-8 space-y-6 animate-fade-in">
        <div className={`p-4 rounded-lg border ${style.border} ${style.bg} flex items-center justify-between`}>
            <div className="flex items-center gap-4">
                {style.icon}
                <span className={`text-2xl font-bold ${style.text}`}>{result.recommendation.toUpperCase()}</span>
            </div>
            <div className="text-right">
                <div className="text-xs text-slate-400">Confidence</div>
                <div className={`font-bold text-lg ${style.text}`}>{ (result.confidence * 100).toFixed(0) }%</div>
            </div>
        </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard title="Identified Chart Pattern" icon={<PatternIcon />}>
            <p className="font-semibold text-lg">{result.pattern}</p>
        </InfoCard>
         <InfoCard title="News Sentiment" icon={<SentimentIcon />}>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${sentimentStyles[result.newsSentiment].bg} ${sentimentStyles[result.newsSentiment].text}`}>
                {result.newsSentiment}
            </span>
        </InfoCard>
      </div>

      <div className="grid md:grid-cols-1 gap-4">
        <InfoCard title="Technical Analysis Summary" icon={<SummaryIcon />}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{result.summary}</p>
        </InfoCard>
      
        <InfoCard title="News & Sentiment Summary" icon={<NewsIcon />}>
            <ul className="space-y-2 list-disc list-inside">
            {result.newsSummary.map((point, index) => (
                <li key={index} className="text-sm leading-relaxed">{point}</li>
            ))}
            </ul>
        </InfoCard>
      </div>

      {sources && sources.length > 0 && (
        <InfoCard title="News Sources" icon={<SourcesIcon />}>
          <ul className="space-y-2">
            {sources.map((source, index) => (
              <li key={index}>
                <a 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-sky-400 hover:text-sky-300 hover:underline truncate block"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </InfoCard>
      )}

    </div>
  );
};