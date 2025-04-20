import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2 } from 'lucide-react';

const SummerizerDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const iframe = document.getElementById('streamlit-iframe');
    
    if (iframe) {
      iframe.addEventListener('load', () => {
        setIsLoading(false);
        console.log('Streamlit Summarizer app loaded successfully');
      });

      iframe.addEventListener('error', () => {
        setIsLoading(false);
        console.error('Error loading Streamlit Summarizer application');
      });

      // Cleanup function
      return () => {
        if (iframe) {
          iframe.removeEventListener('load', () => {});
          iframe.removeEventListener('error', () => {});
        }
      };
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-4">
          <FileText className="w-8 h-8 text-blue-600" />
          <CardTitle className="text-2xl font-bold text-blue-800">
            AI Summarizer Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="mr-2 animate-spin text-blue-600" size={32} />
              <p className="text-gray-600 text-lg">Loading Summarizer...</p>
            </div>
          )}
          <iframe
            id="streamlit-iframe"
            src="http://127.0.0.1:8501"
            width="100%"
            height="800px"
            title="Streamlit Summarizer"
            frameBorder="0"
            className={`transition-all duration-300 ease-in-out ${isLoading ? 'hidden' : 'block'}`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SummerizerDashboard;