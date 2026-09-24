import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, Loader2, RefreshCw } from 'lucide-react';

/**
 * ImageUploader Component
 * Allows administrators to:
 * 1. Upload an image from their local device/storage (with client-side canvas compression)
 * 2. Or enter an external image URL and pick from preset templates
 */
export const ImageUploader = ({
  value = '',
  onChange,
  presets = [],
  label = 'Photo',
  aspectRatio = 'video', // 'video' (16:9 for projects) or 'square' (1:1 for team members)
  required = false
}) => {
  const [mode, setMode] = useState(value && !value.startsWith('data:') && !value.startsWith('/uploads/') ? 'url' : 'device');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [fileDetails, setFileDetails] = useState(null);
  const fileInputRef = useRef(null);

  // Compress image on the client side using HTML5 Canvas
  const compressImage = (file, maxWidth = 1280, maxHeight = 1280, quality = 0.85) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Return compressed base64 JPEG
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve({
            dataUrl,
            width,
            height,
            sizeKb: Math.round((dataUrl.length * 3) / 4 / 1024)
          });
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  // Process chosen file
  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setUploadError('');
    setIsProcessing(true);

    try {
      // 1. Compress client-side
      const maxDim = aspectRatio === 'square' ? 800 : 1280;
      const { dataUrl, width, height, sizeKb } = await compressImage(file, maxDim, maxDim, 0.85);

      setFileDetails({
        name: file.name,
        originalSizeKb: Math.round(file.size / 1024),
        compressedSizeKb: sizeKb,
        dimensions: `${width}×${height}`
      });

      // 2. Attempt to upload to server /api/upload
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: dataUrl,
            filename: file.name
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            onChange(data.url);
            setIsProcessing(false);
            return;
          }
        }
      } catch (serverErr) {
        // If server is not responding to /api/upload, fallback to compressed base64
        console.warn('Backend upload skipped, persisting as optimized data URL:', serverErr);
      }

      // Fallback to dataUrl
      onChange(dataUrl);
    } catch (err) {
      console.error('Image processing failed:', err);
      setUploadError('Failed to process image. Please try another file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {/* Toggle Mode */}
        <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setMode('device')}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-semibold transition-all ${
              mode === 'device'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>From Storage</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-semibold transition-all ${
              mode === 'url'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Photo URL</span>
          </button>
        </div>
      </div>

      {/* MODE 1: UPLOAD FROM DEVICE */}
      {mode === 'device' && (
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {!value ? (
            // Empty Dropzone
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/20'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
                {isProcessing ? (
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-800 hover:text-emerald-700">Click to upload from device</span>
                <span className="text-slate-500"> or drag and drop</span>
              </div>
              <p className="text-[11px] text-slate-400">
                PNG, JPG, WebP up to 10MB (Automatically optimized for web)
              </p>
            </div>
          ) : (
            // Preview & Replace Zone
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3">
              <div
                className={`relative shrink-0 overflow-hidden rounded-lg bg-slate-200 border border-slate-300 ${
                  aspectRatio === 'square' ? 'w-24 h-24' : 'w-36 h-24'
                }`}
              >
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 text-left space-y-1 w-full">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Image ready to save</span>
                </div>
                {fileDetails ? (
                  <div className="text-[11px] text-slate-500 space-y-0.5">
                    <p className="truncate font-medium text-slate-700">{fileDetails.name}</p>
                    <p>
                      Optimized: <span className="font-semibold text-emerald-600">{fileDetails.compressedSizeKb} KB</span> ({fileDetails.dimensions})
                    </p>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 truncate">
                    {value.startsWith('data:') ? 'Stored locally from storage' : value}
                  </p>
                )}

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className="inline-flex items-center space-x-1 text-xs bg-white hover:bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded border border-slate-300 shadow-sm"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Change Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChange('');
                      setFileDetails(null);
                    }}
                    className="inline-flex items-center space-x-1 text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1"
                  >
                    <X className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {uploadError && (
            <p className="text-xs text-red-600 font-semibold">{uploadError}</p>
          )}
        </div>
      )}

      {/* MODE 2: PHOTO URL & PRESETS */}
      {mode === 'url' && (
        <div className="space-y-2">
          <input
            type="url"
            required={required}
            placeholder="https://images.unsplash.com/..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-600 font-mono text-xs"
          />

          {/* Quick Presets */}
          {presets.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400 font-semibold self-center mr-1">Presets:</span>
                {presets.map((pr, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onChange(pr.url)}
                    className="text-[10px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-slate-700 px-2 py-0.5 rounded border border-slate-200 transition-colors"
                  >
                    {pr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Preview if valid URL */}
          {value && (
            <div className="flex items-center space-x-3 pt-1">
              <div
                className={`overflow-hidden rounded-md bg-slate-200 border border-slate-300 shrink-0 ${
                  aspectRatio === 'square' ? 'w-12 h-12' : 'w-20 h-12'
                }`}
              >
                <img
                  src={value}
                  alt="Preview"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] text-slate-400 truncate max-w-xs">
                Live URL Preview
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
