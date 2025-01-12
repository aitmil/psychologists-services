import Image from 'next/image';

import Icon from '@/app/ui/icon';
import CountBox from '@/app/ui/home/count-box';

export default function ImageContent() {
  return (
    <div className="relative">
      <Image
        src="/home.png"
        width={464}
        height={526}
        alt="Photo of psychologist"
      />

      <div className="w-[48px] h-[48px] rounded-[10px] bg-yellow-icon flex justify-center items-center absolute top-[38px] left-[449px] rotate-15">
        <Icon name="icon-users" className="w-[20px] h-[20px] rotate-345"></Icon>
      </div>

      <div className="w-[40px] h-[40px] rounded-[10px] bg-green-icon flex justify-center items-center absolute top-[185px] right-[454px] -rotate-15">
        <Icon
          name="icon-question"
          className="w-[10px] h-[17px] rotate-15"
        ></Icon>
      </div>

      <CountBox />
    </div>
  );
}
