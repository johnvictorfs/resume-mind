import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i,
);

export function MonthYearInput({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
}) {
  const month = value ? value.getMonth() : -1;
  const year = value ? value.getFullYear() : -1;

  function handleMonthChange(newMonth: string) {
    const monthIndex = parseInt(newMonth, 10);
    if (year === -1) {
      onChange(new Date(new Date().getFullYear(), monthIndex, 1));
    } else {
      onChange(new Date(year, monthIndex, 1));
    }
  }

  function handleYearChange(newYear: string) {
    const yearValue = parseInt(newYear, 10);
    if (month === -1) {
      onChange(new Date(yearValue, 0, 1));
    } else {
      onChange(new Date(yearValue, month, 1));
    }
  }

  return (
    <div className="flex gap-2">
      <Select onValueChange={handleMonthChange} value={month.toString()}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Month</SelectLabel>
            {months.map((month, index) => (
              <SelectItem key={month} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={handleYearChange} value={year.toString()}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Year</SelectLabel>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={() => {
          onChange(null);
        }}
        size="icon"
        title="Clear date"
        variant="ghost"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
