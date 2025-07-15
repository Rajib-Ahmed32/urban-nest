const UrbanNestLogo = () => {
  return (
    <div className="flex items-center gap-1 md:gap-1">
      <svg
        width="40"
        height="40"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="20"
          width="12"
          height="34"
          rx="2"
          fill="hsl(20.2, 94.2%, 47.6%)"
        />
        <rect
          x="26"
          y="12"
          width="12"
          height="42"
          rx="2"
          fill="hsl(20.2, 94.2%, 47.6%)"
        />
        <rect
          x="42"
          y="26"
          width="12"
          height="28"
          rx="2"
          fill="hsl(20.2, 94.2%, 47.6%)"
        />
        <path d="M8 52c8 6 24 10 48 0" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <span className="text-2xl font-bold flex">
        <span className="text-[hsl(20.2,94.2%,47.6%)]">Urban</span>
        <span className="text-[hsl(30,3%,21%)]">Nest</span>
      </span>
    </div>
  );
};

export default UrbanNestLogo;
