import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function RentFilter({
  minRent,
  maxRent,
  onMinChange,
  onMaxChange,
  onSearch,
}) {
  return (
    <div className="mb-6 flex justify-center mx-auto flex-col md:flex-row items-center gap-4 px-4 md:px-0">
      <Input
        type="number"
        placeholder="Min Rent"
        value={minRent}
        onChange={onMinChange}
        className="w-full md:w-48 bg-[#f5f6f8] border border-[#b0b3b8] text-[hsl(30,3%,21%)] placeholder:font-medium placeholder:text-gray-500 rounded-md px-4 py-2 shadow-sm focus:border-[#373536] focus:ring-[#373536] transition"
      />
      <Input
        type="number"
        placeholder="Max Rent"
        value={maxRent}
        onChange={onMaxChange}
        className="w-full md:w-48 bg-[#f5f6f8] border border-[#b0b3b8] text-[hsl(30,3%,21%)] placeholder:font-medium placeholder:text-gray-500 rounded-md px-4 py-2 shadow-sm focus:border-[#373536] focus:ring-[#373536] transition"
      />
      <Button
        onClick={onSearch}
        variant="ghost"
        className="w-full md:w-auto flex items-center gap-2 border border-[#373536]/40 text-[#373536] hover:bg-[#dd4b08]/10 hover:border-[#dd4b08] hover:text-[#dd4b08] px-6 py-2 rounded-md font-medium shadow-sm transition"
      >
        <Search className="w-4 h-4" />
        Search
      </Button>
    </div>
  );
}
