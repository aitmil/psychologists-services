import Image from 'next/image';

import Icon from '@/ui/icon';
import CountBox from '@/ui/home/count-box';

export default function ImageContent() {
  return (
    <div className="relative max-w-[464px] lg:max-w-[364px] xl:max-w-[464px] mx-auto lg:mx-0 flex justify-center items-center lg:items-end mt-[24px] sm:mt-[32px] xl:mt-[40px]">
      <Image
        src="/home.png"
        width={464}
        height={526}
        alt="Photo of psychologist"
        priority
      />

      <div className="w-8 h-8 sm:w-[48px] sm:h-[48px]  rounded-[10px] bg-yellow-icon flex justify-center items-center absolute top-[38px] right-[-10px] sm:right-[-41px] rotate-15">
        <Icon name="icon-users" className="w-[20px] h-[20px] rotate-345"></Icon>
      </div>

      <div className="w-8 h-8 sm:w-[40px] sm:h-[40px] rounded-[10px] bg-green-icon flex justify-center items-center absolute top-[110px] sm:top-[185px] left-[-10px] sm:left-[-36px] -rotate-15">
        <Icon
          name="icon-question"
          className="w-[10px] h-[17px] rotate-15"
        ></Icon>
      </div>

      <CountBox />
    </div>
  );
}
