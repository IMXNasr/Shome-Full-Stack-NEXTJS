const SkeletonShowCard = () => {
  return (
    <div className="rounded-xl bg-[#22252f] overflow-hidden p-2 animate-pulse">
      {/* Image Container */}
      <div className="overflow-hidden">
        <div className="rounded-xl w-full aspect-[2/3] bg-[#2a2e3a]" />
      </div>
      {/* Rating */}
      <div className="my-2 p-1 flex items-center gap-1 bg-[#2a2e3a] bg-opacity-50 border border-[#2a2e3a] text-[#2a2e3a] h-[34px] w-[53px] rounded-lg">
        {/* <FaStar /> */}
      </div>
      <div className="h-[20px] mb-4 w-3/4 rounded-full bg-[#2a2e3a]" />
    </div>
  );
}

export default SkeletonShowCard;