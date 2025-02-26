import Icon from '@/ui/icon';

export default function CountBox() {
  return (
    <div className="xl:w-[311px] xl:h-[118px] px-3 py-2 md:p-6 xl:p-8 rounded-[20px] bg-orange-light flex justify-between items-center gap-1 absolute bottom-[40px] sm:bottom-[75px] lg:bottom-[50px] left-[-10px] sm:left-[-80px] md:left-[-101px] xl:right-[254px]">
      <div className="size-8 xl:size-[54px] rounded-[8px] xl:rounded-[13px] bg-main-background flex justify-center items-center">
        <Icon
          name="icon-check"
          className="size-[15px] xl:w-[20px] xl:h-[15px]"
        ></Icon>
      </div>
      <div>
        <p className="text-xs xl:text-sm text-light mb-1 xl:mb-2">
          Experienced psychologists
        </p>
        <p className="font-bold text-sm xl:text-2xl text-main-background">
          15,000
        </p>
      </div>
    </div>
  );
}
