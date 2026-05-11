import { useState } from 'react';
import Card from '../components/ui/Card';
import Textarea from '../components/ui/Textarea';
import CopyButton from '../components/ui/CopyButton';
import SaveToVaultButton from '../components/ui/SaveToVaultButton';

export default function ColorPicker() {
  const [hex, setHex] = useState('#3b82f6');
  
  const hexToRgb = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return isNaN(r) ? 'Invalid' : `rgb(${r}, ${g}, ${b})`;
  };

  const handleHexChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('#')) val = '#' + val;
    setHex(val);
  };

  const rgbValue = hexToRgb(hex);
  const isValid = rgbValue !== 'Invalid';

  return (
    <div className="space-y-8">
      <div className="pt-2">
        <h1 className="text-2xl lg:text-3xl font-extrabold mb-3 text-white">
          Color Converter
        </h1>
        <p className="text-sm lg:text-base max-w-lg leading-relaxed text-[var(--color-text-secondary)]">
          Convert HEX to RGB and pick colors visually.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-5">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                Pick a Color
              </label>
              <input 
                type="color" 
                value={isValid ? hex : '#000000'}
                onChange={(e) => setHex(e.target.value)}
                className="w-full h-24 rounded cursor-pointer border-0 p-0"
              />
              <div className="mt-4">
                <Textarea
                  id="hex-input"
                  label="HEX Value"
                  value={hex}
                  onChange={handleHexChange}
                  rows={1}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex-1 min-h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                RGB Output
              </h2>
              {isValid && (
                <div className="flex gap-2">
                  <SaveToVaultButton 
                    title={`Color: ${hex}`} 
                    content={`HEX: ${hex}\nRGB: ${rgbValue}`} 
                    language="css" 
                    tags={['color', 'css']} 
                  />
                  <CopyButton text={rgbValue} />
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center">
              {isValid ? (
                <div className="text-3xl font-mono tracking-wider font-bold text-white">
                  {rgbValue}
                </div>
              ) : (
                <div className="text-red-400">Invalid HEX code</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
