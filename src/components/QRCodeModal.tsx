import { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';

interface QRCodeModalProps {
  link: string;
  guestName: string;
  onClose: () => void;
}

export default function QRCodeModal({ link, guestName, onClose }: QRCodeModalProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrRef.current && window.QRCode) {
      qrRef.current.innerHTML = '';
      new window.QRCode(qrRef.current, {
        text: link,
        width: 300,
        height: 300,
        colorDark: '#1A237E',
        colorLight: '#FFFFFF',
      });
    }
  }, [link]);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `QR_${guestName.replace(/\s+/g, '_')}.png`;
      a.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">QR Code Undangan</h2>
        <p className="text-center text-gray-600 mb-6">{guestName}</p>

        <div className="flex justify-center mb-6">
          <div ref={qrRef} className="border-4 border-yellow-400 rounded-lg p-4"></div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-[#1A237E] to-yellow-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
        >
          <Download className="w-5 h-5" />
          Download QR Code
        </button>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    QRCode: any;
  }
}
