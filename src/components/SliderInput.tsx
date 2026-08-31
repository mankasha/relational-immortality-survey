"use client";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function SliderInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: SliderInputProps) {
  return (
    <div className="mb-6 rounded-xl border border-[#e8e4dc] bg-white p-4">
      <p className="mb-4 text-sm leading-relaxed">{label}</p>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#5a7a6a]"
      />
      <div className="mt-2 flex justify-between text-xs text-[#8a847c]">
        <span>{min}%</span>
        <span className="text-base font-semibold text-[#5a7a6a]">{value}%</span>
        <span>{max}%</span>
      </div>
    </div>
  );
}
