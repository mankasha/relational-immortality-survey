"use client";

import { LIKERT_LABELS } from "@/lib/constants";

interface LikertScaleProps {
  value?: number;
  onChange: (value: number) => void;
  label: string;
  lowLabel?: string;
  highLabel?: string;
}

export function LikertScale({
  value,
  onChange,
  label,
  lowLabel = "Strongly disagree",
  highLabel = "Strongly agree",
}: LikertScaleProps) {
  return (
    <div className="mb-6 rounded-xl border border-[#e8e4dc] bg-white p-4">
      <p className="mb-4 text-sm leading-relaxed text-[#2c2a26]">{label}</p>
      <div className="mb-2 flex justify-between text-xs text-[#8a847c]">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n}: ${LIKERT_LABELS[n - 1]}`}
            className={`flex h-10 flex-1 items-center justify-center rounded-lg text-sm font-medium transition ${
              value === n
                ? "bg-[#5a7a6a] text-white"
                : "bg-[#f0ece4] text-[#5a554f] hover:bg-[#e8e4dc]"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

interface LikertGroupProps {
  items: {
    id: string;
    label: string;
    lowLabel?: string;
    highLabel?: string;
  }[];
  values: Record<string, number | undefined>;
  onChange: (id: string, value: number) => void;
}

export function LikertGroup({ items, values, onChange }: LikertGroupProps) {
  return (
    <div>
      {items.map((item) => (
        <LikertScale
          key={item.id}
          label={item.label}
          value={values[item.id]}
          onChange={(v) => onChange(item.id, v)}
          lowLabel={item.lowLabel}
          highLabel={item.highLabel}
        />
      ))}
    </div>
  );
}
