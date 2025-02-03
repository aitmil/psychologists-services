import Icon from '@/ui/icon';

export default function CountBox() {
  return (
    <div className="w-[311px] h-[118px] p-8 rounded-[20px] bg-orange-light flex justify-between items-center absolute bottom-[75px] right-[254px]">
      <div className="w-[54px] h-[54px] rounded-[13px] bg-main-background flex justify-center items-center">
        <Icon name="icon-check" className="w-[20px] h-[15px]"></Icon>
      </div>
      <div>
        <p className="text-sm text-light mb-2">Experienced psychologists</p>
        <p className="font-bold text-xl text-main-background">15,000</p>
      </div>
    </div>
  );
}
