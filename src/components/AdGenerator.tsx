import React, { useState } from 'react';
import { Shuffle, Save } from 'lucide-react';
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
          width: Math.max(50, Math.min(800, width)), // Limit width between 50 and 800
          height: Math.max(50, Math.min(600, height)) // Limit height between 50 and 600
        }
      });
    }
  };

  const handleImagePosition = (x: number, y: number) => {
    if (adImage) {
      setAdImage({
        ...adImage,
        position: { 
          x: Math.max(-200, Math.min(400, x)), // Limit x position
          y: Math.max(-200, Math.min(400, y))  // Limit y position
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Social Media Ad Generator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter city name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>

          {adImage && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Size
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={adImage.size.width}
                    onChange={(e) => handleImageResize(Number(e.target.value), adImage.size.height)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Width"
                    min="50"
                    max="800"
                  />
                  <input
                    type="number"
                    value={adImage.size.height}
                    onChange={(e) => handleImageResize(adImage.size.width, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Height"
                    min="50"
                    max="600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Position
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    value={adImage.position.x}
                    onChange={(e) => handleImagePosition(Number(e.target.value), adImage.position.y)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="X position"
                    min="-200"
                    max="400"
                  />
                  <input
                    type="number"
                    value={adImage.position.y}
                    onChange={(e) => handleImagePosition(adImage.position.x, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Y position"
                    min="-200"
                    max="400"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleRandomize}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Shuffle className="w-5 h-5" />
            Randomize Template
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <AdPreview ad={generatedAd} />
          
          <button
            className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            <Save className="w-5 h-5" />
            Save Ad
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdGenerator;
