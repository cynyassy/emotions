import React, { useState, useRef } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Copy, Check, Camera, Instagram, Download } from 'lucide-react';
import ScreenshotCard from './ScreenshotCard';

interface SocialShareProps {
  emotions: string[];
  needs: string[];
  feelingType: 'good' | 'bad';
}

export default function SocialShare({ emotions, needs, feelingType }: SocialShareProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [screenshotStatus, setScreenshotStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const screenshotRef = useRef<HTMLDivElement>(null);

  const generateShareText = () => {
    const emotionsText = emotions.join(', ');
    const needsText = needs.join(', ');
    const needsStatus = feelingType === 'good' ? 'being met' : 'not being met';
    
    return `I just completed an emotional journey and discovered I'm feeling ${emotionsText} because my needs for ${needsText} are ${needsStatus}. Understanding our emotions helps us understand ourselves better! 🌟 #EmotionalWellness #SelfAwareness #EmotionIdentifier`;
  };

  const shareText = generateShareText();
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct web share API, so we'll copy the text and guide the user
    handleCopyToClipboard();
    alert('Text copied! Open Instagram and paste it into a new post. You can also take a screenshot using the camera button below to share as an image.');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleScreenshot = async () => {
    setScreenshotStatus('generating');

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = 500;
      const height = 400;
      const scale = 2;

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(scale, scale);
      drawShareCard(ctx, width, height);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `my-emotional-journey-${Date.now()}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setScreenshotStatus('success');
      setTimeout(() => setScreenshotStatus('idle'), 3000);
    } catch (error) {
      console.error('Screenshot failed:', error);
      setScreenshotStatus('error');
      setTimeout(() => setScreenshotStatus('idle'), 3000);

      alert('Screenshot failed. You can manually take a screenshot of the preview card shown above using your device\'s screenshot feature.');
    }
  };

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    words.forEach((word) => {
      const testLine = line ? `${line} ${word}` : word;

      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, currentY);
        line = word;
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    });

    if (line) {
      ctx.fillText(line, x, currentY);
    }

    return currentY + lineHeight;
  };

  const drawHeartIcon = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(16, 29);
    ctx.bezierCurveTo(4, 18, 0, 11, 4, 5);
    ctx.bezierCurveTo(8, 0, 14, 2, 16, 7);
    ctx.bezierCurveTo(18, 2, 24, 0, 28, 5);
    ctx.bezierCurveTo(32, 11, 28, 18, 16, 29);
    ctx.stroke();
    ctx.restore();
  };

  const drawBrainIcon = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(16, 30);
    ctx.lineTo(16, 4);
    ctx.moveTo(16, 6);
    ctx.bezierCurveTo(9, 0, 2, 5, 5, 12);
    ctx.bezierCurveTo(-1, 16, 3, 25, 11, 23);
    ctx.bezierCurveTo(11, 28, 16, 31, 16, 30);
    ctx.moveTo(16, 6);
    ctx.bezierCurveTo(23, 0, 30, 5, 27, 12);
    ctx.bezierCurveTo(33, 16, 29, 25, 21, 23);
    ctx.bezierCurveTo(21, 28, 16, 31, 16, 30);
    ctx.moveTo(8, 12);
    ctx.bezierCurveTo(11, 12, 13, 14, 13, 17);
    ctx.moveTo(24, 12);
    ctx.bezierCurveTo(21, 12, 19, 14, 19, 17);
    ctx.stroke();
    ctx.restore();
  };

  const drawShareCard = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const emotionsList = emotions.join(', ');
    const needsList = needs.join(', ');
    const needsStatus = feelingType === 'good' ? 'are being met' : 'are not being met';
    const gradient = ctx.createLinearGradient(0, 0, width, height);

    if (feelingType === 'good') {
      gradient.addColorStop(0, '#14b8a6');
      gradient.addColorStop(0.5, '#0d9488');
      gradient.addColorStop(1, '#0f766e');
    } else {
      gradient.addColorStop(0, '#f48071');
      gradient.addColorStop(0.5, '#e56b5a');
      gradient.addColorStop(1, '#d45a49');
    }

    drawRoundedRect(ctx, 0, 0, width, height, 24);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.save();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#ffffff';
    [
      [64, 64, 32],
      [408, 56, 11],
      [64, 340, 24],
      [426, 366, 9],
      [176, 210, 20],
    ].forEach(([circleX, circleY, radius]) => {
      ctx.beginPath();
      ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    drawHeartIcon(ctx, 40, 40);
    drawBrainIcon(ctx, 78, 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 24px Arial, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText('My Emotional Journey', 40, 94);

    drawRoundedRect(ctx, 70, 155, 360, 112, 12);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '700 18px Arial, sans-serif';
    let y = drawWrappedText(ctx, `It seems that you are feeling ${emotionsList}.`, 90, 178, 320, 24);
    y = drawWrappedText(ctx, `Because your needs for ${needsList}, ${needsStatus}.`, 90, y + 8, 320, 24);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 330);
    ctx.lineTo(460, 330);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '400 14px Arial, sans-serif';
    ctx.fillText('The Emotion Identifier', 40, 352);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = '400 12px Arial, sans-serif';
    ctx.fillText('Expand your emotional vocabulary', 40, 374);
  };

  const fallbackCopyToClipboard = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.setAttribute('readonly', '');
      textArea.style.opacity = '0';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopyStatus('success');
        setTimeout(() => setCopyStatus('idle'), 2000);
        return true;
      } else {
        throw new Error('execCommand failed');
      }
    } catch (err) {
      console.error('Fallback copy failed: ', err);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 3000);
      return false;
    }
  };

  const handleCopyToClipboard = async () => {
    const textToCopy = `${shareText}\n\n${shareUrl}`;
    setCopyStatus('idle');
    
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopyStatus('success');
        setTimeout(() => setCopyStatus('idle'), 2000);
        return;
      } catch (err) {
        console.warn('Clipboard API failed, trying fallback: ', err);
      }
    }
    
    const success = fallbackCopyToClipboard(textToCopy);
    if (!success) {
      const userConfirmed = window.confirm(
        'Unable to copy automatically. Would you like to see the text so you can copy it manually?'
      );
      
      if (userConfirmed) {
        window.prompt('Copy this text:', textToCopy);
      }
    }
  };

  const handleGenericShare = async () => {
    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'My Emotional Journey',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        console.log('Native share cancelled or failed:', err);
      }
    }
    
    handleCopyToClipboard();
  };

  const getCopyButtonContent = () => {
    switch (copyStatus) {
      case 'success':
        return (
          <>
            <Check className="w-4 h-4 text-white" />
            <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
              Copied!
            </span>
          </>
        );
      case 'error':
        return (
          <>
            <Copy className="w-4 h-4 text-white" />
            <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
              Try Again
            </span>
          </>
        );
      default:
        return (
          <>
            <Copy className="w-4 h-4 text-white" />
            <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
              Copy
            </span>
          </>
        );
    }
  };

  const getScreenshotButtonContent = () => {
    switch (screenshotStatus) {
      case 'generating':
        return (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
              Creating...
            </span>
          </>
        );
      case 'success':
        return (
          <>
            <Download className="w-4 h-4 text-white" />
            <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
              Downloaded!
            </span>
          </>
        );
      case 'error':
        return (
          <>
            <Camera className="w-4 h-4 text-white" />
            <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
              Try Again
            </span>
          </>
        );
      default:
        return (
          <>
            <Camera className="w-4 h-4 text-white" />
            <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
              Screenshot
            </span>
          </>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Screenshot Card - Hidden but rendered for capture */}
      <div className="fixed -top-[1000px] -left-[1000px] pointer-events-none">
        <ScreenshotCard
          ref={screenshotRef}
          emotions={emotions}
          needs={needs}
          feelingType={feelingType}
        />
      </div>

      {/* Preview of what will be shared */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-[#000000] text-[14px] leading-[1.4] mb-2">
          <span className="font-medium">Preview:</span> This is what will be shared
        </p>
        <div className="w-[375px] h-[300px] max-w-full overflow-hidden">
          <div className="transform scale-75 origin-top-left">
            <ScreenshotCard
              emotions={emotions}
              needs={needs}
              feelingType={feelingType}
            />
          </div>
        </div>
      </div>

      {/* Social Media Share Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={handleTwitterShare}
          className="flex items-center justify-center gap-2 h-[40px] bg-[#1DA1F2] rounded cursor-pointer hover:bg-[#1a91da] transition-colors"
        >
          <Twitter className="w-4 h-4 text-white" />
          <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
            Twitter
          </span>
        </button>
        
        <button
          onClick={handleFacebookShare}
          className="flex items-center justify-center gap-2 h-[40px] bg-[#4267B2] rounded cursor-pointer hover:bg-[#365899] transition-colors"
        >
          <Facebook className="w-4 h-4 text-white" />
          <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
            Facebook
          </span>
        </button>
        
        <button
          onClick={handleInstagramShare}
          className="flex items-center justify-center gap-2 h-[40px] bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] rounded cursor-pointer hover:from-[#7028a3] hover:to-[#e31a1a] transition-colors"
        >
          <Instagram className="w-4 h-4 text-white" />
          <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
            Instagram
          </span>
        </button>
        
        <button
          onClick={handleLinkedInShare}
          className="flex items-center justify-center gap-2 h-[40px] bg-[#0077B5] rounded cursor-pointer hover:bg-[#005885] transition-colors"
        >
          <Linkedin className="w-4 h-4 text-white" />
          <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[12px]">
            LinkedIn
          </span>
        </button>
      </div>

      {/* Screenshot and Copy Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={handleScreenshot}
          disabled={screenshotStatus === 'generating'}
          className={`flex items-center justify-center gap-2 h-[40px] rounded cursor-pointer transition-colors ${
            screenshotStatus === 'success' 
              ? 'bg-green-600 hover:bg-green-700' 
              : screenshotStatus === 'error'
              ? 'bg-red-600 hover:bg-red-700'
              : screenshotStatus === 'generating'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#2c4b51] hover:bg-[#1e3237]'
          }`}
        >
          {getScreenshotButtonContent()}
        </button>
        
        <button
          onClick={handleCopyToClipboard}
          className={`flex items-center justify-center gap-2 h-[40px] rounded cursor-pointer transition-colors ${
            copyStatus === 'success' 
              ? 'bg-green-600 hover:bg-green-700' 
              : copyStatus === 'error'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-[#2c4b51] hover:bg-[#1e3237]'
          }`}
        >
          {getCopyButtonContent()}
        </button>
      </div>
      
      {/* Generic Share Button */}
      <button
        onClick={handleGenericShare}
        className="flex items-center justify-center gap-2 h-[40px] w-full bg-[#63b2c1] rounded cursor-pointer hover:bg-[#4a9bb0] transition-colors"
      >
        <Share2 className="w-4 h-4 text-white" />
        <span className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-white text-[14px]">
          Share My Journey
        </span>
      </button>
      
      {/* Status Messages */}
      {copyStatus === 'error' && (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          <p className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-[12px]">
            Having trouble copying? You can manually select and copy the text that appears when you click "Try Again".
          </p>
        </div>
      )}
      
      {copyStatus === 'success' && (
        <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded text-green-700 text-sm">
          <p className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-[12px]">
            Your emotional journey has been copied to clipboard! You can now paste it anywhere.
          </p>
        </div>
      )}

      {screenshotStatus === 'success' && (
        <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded text-green-700 text-sm">
          <p className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-[12px]">
            Screenshot saved to your downloads! You can now share it on any platform.
          </p>
        </div>
      )}

      {screenshotStatus === 'error' && (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          <p className="font-['Josefin_Sans:Regular',_sans-serif] font-normal text-[12px]">
            Screenshot failed. Try using your device's built-in screenshot feature to capture the preview above.
          </p>
        </div>
      )}
    </div>
  );
}
