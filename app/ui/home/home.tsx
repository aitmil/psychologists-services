import Container from '@/app/ui/container';
import Text from '@/app/ui/text';
import Title from '@/app/ui/title';
import Button from '@/app/ui/button';
import ImageContent from './image';

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
        <ImageContent />
      </section>
    </Container>
  );
}
