import Container from '@/app/ui/container';
import Filters from '@/app/ui/psychologists/filters';
import PsychologistsList from '@/app/ui/psychologists/psychologists-list';
import Section from '@/app/ui/section';

export default function PsychologistsPage() {
  return (
    <Section variant="home">
      <Container>
        <Filters />
        <PsychologistsList />
      </Container>
    </Section>
  );
}
