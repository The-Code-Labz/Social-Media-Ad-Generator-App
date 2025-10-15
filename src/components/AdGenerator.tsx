import React, { useState } from 'react';
import { Shuffle, Save, Sparkles } from 'lucide-react';
import { adTemplates } from '../data/adTemplates';
import { GeneratedAd, AdImage } from '../types/ad';
import ImageUploader from './ImageUploader';
import AdPreview from './AdPreview';

const AdGenerator: React.FC = () => {
  const [city, setCity] = useState('');
  const [currentAd, setCurrentAd] = useState(adTemplates[0]);
  const [adImage, setAdImage] = useState<AdImage | undefined>();

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * adTemplates.length);
    setCurrentAd(adTemplates[randomIndex]);
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setAdImage({
      url,
      position: { x: 0, y: 0 },
      size: { width: 400, height: 300 }
    });
  };

  const handleImageResize = (width: number, height: number) => {
    if (adImage) {
      setAdImage({
        ...adImage,
        size: { 
          width: Math.max(50, Math.min(800, width)),
          height: Math.max(50, Math.min(600, height))
        }
      });
    }
  };

  const handleImagePosition = (x: number, y: number) => {
    if (adImage) {
      setAdImage({
        ...adImage,
        position: { 
          x: Math.max(-200, Math.min(400, x)),
          y: Math.max(-200, Math.min(400, y))
        }
      });
    }
  };

  const generatedAd: GeneratedAd = {
    template: currentAd,
    image: adImage,
    city
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Ad Creation</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Social Media Ad Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create stunning, professional ads in seconds. Customize, preview, and export with ease.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
                Customize Your Ad
              </h2>

              {/* City Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3" htmlFor="city-input">
                  Target City
                </label>
                <input
                  id="city-input"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-800 placeholder-gray-400"
                  placeholder="e.g., New York, London, Tokyo"
                  aria-label="Enter target city for your ad"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload Image
                </label>
                <ImageUploader onImageUpload={handleImageUpload} />
              </div>

              {/* Image Controls */}
              {adImage && (
                <div className="space-y-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Image Dimensions
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-2" htmlFor="width-input">Width (px)</label>
                        <input
                          id="width-input"
                          type="number"
                          value={adImage.size.width}
                          onChange={(e) => handleImageResize(Number(e.target.value), adImage.size.height)}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none"
                          min="50"
                          max="800"
                          aria-label="Image width in pixels"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-2" htmlFor="height-input">Height (px)</label>
                        <input
                          id="height-input"
                          type="number"
                          value={adImage.size.height}
                          onChange={(e) => handleImageResize(adImage.size.width, Number(e.target.value))}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none"
                          min="50"
                          max="600"
                          aria-label="Image height in pixels"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Image Position
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-2" htmlFor="x-position">X Position</label>
                        <input
                          id="x-position"
                          type="number"
                          value={adImage.position.x}
                          onChange={(e) => handleImagePosition(Number(e.target.value), adImage.position.y)}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none"
                          min="-200"
                          max="400"
                          aria-label="Image X position"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-2" htmlFor="y-position">Y Position</label>
                        <input
                          id="y-position"
                          type="number"
                          value={adImage.position.y}
                          onChange={(e) => handleImagePosition(adImage.position.x, Number(e.target.value))}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all outline-none"
                          min="-200"
                          max="400"
                          aria-label="Image Y position"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Randomize Button */}
              <button
                onClick={handleRandomize}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl mt-6"
                aria-label="Generate random ad template"
              >
                <Shuffle className="w-5 h-5" />
                Randomize Template
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all hover:shadow-xl sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                Live Preview
              </h2>
              
              <div className="mb-6">
                <AdPreview ad={generatedAd} />
              </div>
              
              <button
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl"
                aria-label="Save generated ad"
              >
                <Save className="w-5 h-5" />
                Save Ad
              </button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Download your ad in high resolution</p>
              </div>
            </div>

            {/* Additional Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-semibold text-gray-800 mb-3">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Experiment with different templates using the randomize button
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Adjust image position for perfect alignment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Use high-resolution images for best results
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdGenerator;