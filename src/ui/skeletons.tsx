const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function SmallCardSkeleton() {
  return (
    <div className="flex gap-[14px] mb-10">
      <div className="size-[44px] bg-[#f3f3f3] rounded-[15px]"></div>
      <div>
        <div className="w-[109px] h-[16px] bg-[#f3f3f3] rounded-xl mb-1"></div>
        <div className="w-[116px] h-[24px] bg-[#f3f3f3] rounded-xl"></div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} flex gap-6 rounded-3xl bg-[rgb(248,248,248)] p-6`}
    >
      <div className="size-[120px] bg-[#f3f3f3] rounded-[30px]"></div>;
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <div className="w-[98px] bg-[#f3f3f3] rounded-xl"></div>
          <div className="flex gap-[28px]">
            <div className="w-[285px] bg-[#f3f3f3] rounded-xl"></div>
            <div className="size-[26px] bg-[#f3f3f3] rounded-xl"></div>
          </div>
        </div>
        <div className="w-[225px] h-6 mb-6 bg-[#f3f3f3] rounded-xl"></div>
        <div className="flex gap-1 mb-2">
          <div className="w-[193px] h-10 bg-[#f3f3f3] rounded-3xl"></div>
          <div className="w-[409px] h-10 bg-[#f3f3f3] rounded-3xl"></div>
        </div>
        <div className="flex gap-1 mb-6">
          <div className="w-[332px] h-10 bg-[#f3f3f3] rounded-3xl"></div>
          <div className="w-[447px] h-10 bg-[#f3f3f3] rounded-3xl"></div>
        </div>
        <div className="w-full h-20 mb-[14px] bg-[#f3f3f3] rounded-xl"></div>
        <div className="w-[82px] h-6 bg-[#f3f3f3] rounded-xl"></div>
      </div>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
