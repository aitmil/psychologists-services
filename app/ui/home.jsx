import Image from 'next/image';

import Container from '@/app/ui/container';
import Text from '@/app/ui/text';
import Title from '@/app/ui/title';
import Button from '@/app/ui/button';
import Icon from './icon';

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
          <Button type="button" variant="filled">
            Get started
          </Button>
        </div>
        <div className="relative">
          <Image
            src="/home.png"
            width={464}
            height={526}
            alt="Photo of psychologist"
          />

          <div className="w-[48px] h-[48px] rounded-[10px] bg-yellow-icon flex justify-center items-center absolute top-[38px] left-[449px] rotate-15">
            <Icon
              name="icon-users"
              className="w-[20px] h-[20px] rotate-345"
            ></Icon>
          </div>
        </div>
      </section>
    </Container>
  );
}
