import React from 'react';
import { GeneratedAd } from '../types/ad';

interface AdPreviewProps {
  ad: GeneratedAd;
}

const AdPreview: React.FC<AdPreviewProps> = ({ ad }) => {
  const formattedText = ad.template.primaryText.replace('[CITY]', ad.city || '[CITY]');

  const getTextContainerStyle = () => {
    if (!ad.image) return {};

    const imageBottom = ad.image.position.y + ad.image.size.height;

    if (ad.image.position.y < 100) {
      return {
        marginTop: `${Math.max(0, imageBottom)}px`,
      };
    }

    return {
      marginBottom: `${Math.max(0, ad.image.size.height)}px`,
    };
  };

  return (
    <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white shadow-inner overflow-hidden">
      <div className="relative min-h-[400px]">
        {/* Image Container */}
        {ad.image && (
          <div 
            className="relative transition-all duration-300"
            style={{
              height: `${ad.image.size.height}px`,
              width: `${ad.image.size.width}px`,
              left: `${ad.image.position.x}px`,
              top: `${ad.image.position.y}px`,
              position: 'relative'
            }}
          >
            <img
              src={ad.image.url}
              alt="Ad visual"
              className="rounded-xl absolute top-0 left-0 shadow-lg"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Text Content */}
        <div 
          className="relative z-10 transition-all duration-300"
          style={getTextContainerStyle()}
        >
          <div 
            className="whitespace-pre-wrap mb-4 bg-white bg-opacity-95 p-4 rounded-xl shadow-sm backdrop-blur-sm border border-gray-100"
          >
            <p className="text-gray-800 leading-relaxed">{formattedText}</p>
          </div>
          <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent bg-white bg-opacity-95 p-4 rounded-xl shadow-sm backdrop-blur-sm border border-gray-100">
            {ad.template.headline}
          </div>
        </div>

        {/* Empty State */}
        {!ad.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium">Upload an image to see your ad come to life</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdPreview;
