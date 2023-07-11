const SkeletonShowCard = () => {
  return (
    <div className="rounded-xl bg-card overflow-hidden p-2 animate-pulse">
      {/* Image Container */}
      <div className="overflow-hidden">
        <div className="rounded-xl w-full aspect-[2/3] bg-skeleton" />
      </div>
      {/* Rating */}
      <div className="my-2 p-1 flex items-center gap-1 bg-skeleton bg-opacity-50 h-[36px] w-[55px] rounded-lg">
        {/* <FaStar /> */}
      </div>
      <div className="h-[20px] mb-4 w-3/4 rounded-full bg-skeleton" />
    </div>
  );
}

export default SkeletonShowCard;