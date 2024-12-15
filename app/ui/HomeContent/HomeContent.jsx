import Container from '../Container';
import Text from '../Text';
import Title from '../Title';
import Button from '../Button';
import css from './HomeContent.module.css';

export default function HomeContent() {
  return (
    <Container>
      <Title variant="h1">
        The road to the <span className={css.accent}>depths</span> of the human
        soul
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
