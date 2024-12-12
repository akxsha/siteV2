'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function Terminal() {
  const [terminalStep, setTerminalStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const terminalSteps = [
    'import { use } from convoy-kit',
    'import convoy from convoy-SDK',
    ' ',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerminalStep((prev) =>
        prev < terminalSteps.length - 1 ? prev + 1 : prev
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [terminalStep]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(terminalSteps.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 text-white font-mono text-sm relative">
      {/* Tab bar */}
      <div className="flex items-center bg-gray-800 text-gray-400 px-4 py-2">
        {/* Tabs */}
        <div className="flex space-x-4">
          {/* Active Tab */}
          <div className="text-white bg-gray-700 px-4 py-1 rounded-t-md">
            index.js
          </div>
          {/* Other Tabs */}
          <div className="px-4 py-1">package.json</div>
          <div className="px-4 py-1">index.css</div>
        </div>
        {/* Copy button */}
        {/* <div className="ml-auto">
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div> */}
      </div>
      <div className="p-4">
        <div className=" space-y-1">
          {terminalSteps.map((step, index) => (
            <div
              key={index}
              className= {`flex items-center ${
                index > terminalStep ? 'opacity-0' : 'opacity-100'
              } transition-opacity duration-300`}
            >
              {/* Line number */}
              <div className="w-8 text-gray-500 text-right pr-2">{index + 1}</div>
              {/* Terminal step */}
              <div className="leading-6">{step}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
