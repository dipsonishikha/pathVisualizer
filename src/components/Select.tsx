
import {type ChangeEvent} from "react";

interface SelectProps {
  label: string;
  value: string | number;
  options: Array<{ name: string; value: string | number }>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
}

export function Select({ label, value, options, onChange, isDisabled = false }: SelectProps) {
  return (
    <div className="flex flex-col gap-1 min-w-[140px]">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        disabled={isDisabled}
        className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold text-gray-900 text-sm
                   hover:border-indigo-400 hover:bg-indigo-50/50 
                   focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 
                   focus:outline-none transition-all duration-200 cursor-pointer 
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:bg-gray-100
                   shadow-sm hover:shadow-md appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234f46e5' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.25em 1.25em',
          paddingRight: '2.5rem'
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}