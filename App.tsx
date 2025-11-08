import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { AnalysisResult } from './components/AnalysisResult';
import { Loader } from './components/Loader';
import { analyzeStockChart } from './services/geminiService';
import type { AnalysisData, NewsSource } from './types';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

function App() {
  const [page, setPage] = useState<'home' | 'about'>('home');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [sources, setSources] = useState<NewsSource[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setAnalysis(null);
    setSources(null);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setSources(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleAnalyzeClick = async () => {
    if (!imageFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setSources(null);

    try {
      const imagePart = await fileToGenerativePart(imageFile);
      const result = await analyzeStockChart(imagePart);
      
      if (result.analysis) {
        setAnalysis(result.analysis);
      }
      if (result.sources) {
        setSources(result.sources);
      }

    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "An unexpected error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={page} setPage={setPage} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-800">
          {page === 'home' ? (
            <>
              <FileUpload
                onImageUpload={handleImageUpload}
                imagePreviewUrl={imagePreview}
                onClear={handleClear}
                isAnalyzing={isLoading}
                onAnalyze={handleAnalyzeClick}
              />

              {isLoading && <Loader />}

              {error && (
                <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
                  <p className="font-semibold">Analysis Failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              {analysis && (
                <AnalysisResult result={analysis} sources={sources} />
              )}
            </>
          ) : (
            <AboutPage />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;