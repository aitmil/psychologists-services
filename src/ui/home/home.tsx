import Link from 'next/link';

import Container from '@/ui/container';
import Text from '@/ui/text';
import Title from '@/ui/title';
import ImageContent from '@/ui/home/image';
import Icon from '@/ui/icon';

export default function HomeContent() {
  return (
    <Container>
      <section className="lg:flex justify-between items-center gap-8 xl:gap-0">
        <div className="flex flex-col items-center lg:items-start">
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
          <Link
            href={'/psychologists'}
            className="flex justify-center transition duration-200 active:scale-95 active:opacity-80"
          >
            <span className="w-[236px] flex gap-[18px] items-center justify-center font-medium text-[16px] leading-[125%] tracking-[-0.01em] rounded-[30px] transition px-[40px] py-[14px]  text-white bg-orange-light hover:bg-orange-dark active:bg-orange-dark">
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
