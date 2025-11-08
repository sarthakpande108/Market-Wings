export type Recommendation = 'Buy' | 'Sell' | 'Hold';
export type Sentiment = 'Positive' | 'Negative' | 'Neutral';

export interface AnalysisData {
  recommendation: Recommendation;
  confidence: number;
  pattern: string;
  summary: string;
  newsSentiment: Sentiment;
  newsSummary: string[];
}

export interface NewsSource {
  title: string;
  uri: string;
}