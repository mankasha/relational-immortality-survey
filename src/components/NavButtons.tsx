"use client";

interface NavButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  showExit?: boolean;
  onExit?: () => void;
}

export function NavButtons({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
  showBack = true,
  showExit = false,
  onExit,
}: NavButtonsProps) {
  return (
    <div className="mt-8 flex flex-col gap-3">
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="w-full rounded-xl bg-[#5a7a6a] px-6 py-3.5 text-base font-medium text-white transition hover:bg-[#4a6a5a] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {nextLabel}
      </button>
      <div className="flex gap-3">
        {showBack && onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm text-[#5a554f] transition hover:bg-[#faf8f4]"
          >
            Back
          </button>
        )}
        {showExit && onExit && (
          <button
            type="button"
            onClick={onExit}
            className="flex-1 rounded-xl border border-[#d4cfc4] bg-white px-4 py-3 text-sm text-[#5a554f] transition hover:bg-[#faf8f4]"
          >
            Exit survey
          </button>
        )}
      </div>
    </div>
  );
}
