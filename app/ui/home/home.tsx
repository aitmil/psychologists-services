import Link from 'next/link';

import Container from '@/app/ui/container';
import Text from '@/app/ui/text';
import Title from '@/app/ui/title';
import ImageContent from './image';
import Icon from '../icon';

export default function HomeContent() {
  return (
    <Container>
      <section className="flex justify-between items-center">
        <div>
          <Title variant="h1">
            The road to the{' '}
            <span className="italic text-orange-light">depths</span> of the
            human soul
          </Title>
          <Text variant="homeText">
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </Text>
          <Link href={'/psychologists'} className="">
            <span className="w-[236px] flex gap-[18px] items-center justify-center font-medium text-[16px] leading-[125%] tracking-[-0.01em] rounded-[30px] transition px-[40px] py-[14px]  text-white bg-orange-light hover:bg-orange-dark">
              Get started
              <Icon name="icon-arrow" className="w-3 h-4 "></Icon>
            </span>
          </Link>
        </div>
        <ImageContent />
      </section>
    </Container>
  );
}
