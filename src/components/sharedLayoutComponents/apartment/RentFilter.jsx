import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RentFilter({
  minRent,
  maxRent,
  onMinChange,
  onMaxChange,
  onSearch,
}) {
  return (
    <div className="mb-8 flex flex-col md:flex-row items-center gap-4">
      <Input
        type="number"
        placeholder="Min Rent"
        value={minRent}
        onChange={onMinChange}
        className="w-full md:w-48"
      />
      <Input
        type="number"
        placeholder="Max Rent"
        value={maxRent}
        onChange={onMaxChange}
        className="w-full md:w-48"
      />
      <Button className="w-full md:w-auto" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
}
