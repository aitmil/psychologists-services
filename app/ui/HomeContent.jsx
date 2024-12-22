import Container from '@/app/ui/Container';
import Text from '@/app/ui/Text';
import Title from '@/app/ui/Title';
import Button from '@/app/ui/Button';

export default function HomeContent() {
  return (
    <Container>
      <Title variant="h1">
        The road to the <span className="italic text-orange-light">depths</span>{' '}
        of the human soul
      </Title>
      <Text variant="homeText">
        We help you to reveal your potential, overcome challenges and find a
        guide in your own life with the help of our experienced psychologists.
      </Text>
      <Button type="button" variant="filled">
        Get started
      </Button>
    </Container>
  );
}
