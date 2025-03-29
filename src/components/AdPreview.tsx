import React from 'react';
import { GeneratedAd } from '../types/ad';

interface AdPreviewProps {
  ad: GeneratedAd;
}

const AdPreview: React.FC<AdPreviewProps> = ({ ad }) => {
  const formattedText = ad.template.primaryText.replace('[CITY]', ad.city);

  // Calculate text container position and dimensions based on image
  const getTextContainerStyle = () => {
    if (!ad.image) return {};

    const imageBottom = ad.image.position.y + ad.image.size.height;
    const imageRight = ad.image.position.x + ad.image.size.width;

    // If image is positioned from the top, move text below it
    if (ad.image.position.y < 100) {
      return {
        marginTop: `${Math.max(0, imageBottom)}px`,
      };
    }

    // If image is positioned from the bottom, keep text at top
    return {
      marginBottom: `${Math.max(0, ad.image.size.height)}px`,
    };
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md max-w-lg">
      <div className="relative">
        {/* Image Container */}
        {ad.image && (
          <div 
            className="relative"
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
              alt="Ad"
              className="rounded-lg absolute top-0 left-0"
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
          className="relative z-10"
          style={getTextContainerStyle()}
        >
          <div 
            className="whitespace-pre-wrap mb-4 bg-white bg-opacity-90 p-2 rounded"
          >
            {formattedText}
          </div>
          <div className="font-bold text-lg bg-white bg-opacity-90 p-2 rounded">
            {ad.template.headline}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPreview;
