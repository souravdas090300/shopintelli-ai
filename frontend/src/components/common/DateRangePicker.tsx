import React, { useMemo, useState } from 'react';

export type DateRange = { from: string; to: string };

const presets: { label: string; value: string; days: number }[] = [
  { label: 'Last 7 days', value: '7d', days: 7 },
  { label: 'Last 30 days', value: '30d', days: 30 },
  { label: 'Last 90 days', value: '90d', days: 90 },
];

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

const DateRangePicker: React.FC<{
  value?: DateRange;
  onApply?: (range: DateRange) => void;
}> = ({ value, onApply }) => {
  const today = useMemo(() => new Date(), []);
  const [preset, setPreset] = useState<string>('30d');
  const [from, setFrom] = useState<string>(value?.from || formatDate(new Date(today.getTime() - 29 * 86400000)));
  const [to, setTo] = useState<string>(value?.to || formatDate(today));

  const applyPreset = (val: string) => {
    setPreset(val);
    const p = presets.find((p) => p.value === val) || presets[1];
    const end = new Date();
    const start = new Date(end.getTime() - (p.days - 1) * 86400000);
    setFrom(formatDate(start));
    setTo(formatDate(end));
    onApply?.({ from: formatDate(start), to: formatDate(end) });
  };

  const applyManual = () => {
    onApply?.({ from, to });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <select
        value={preset}
        onChange={(e) => applyPreset(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {presets.map((p) => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={applyManual}
        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Apply
      </button>
    </div>
  );
};

export default DateRangePicker;
