import HomeContent from '../../components/HomeContent/HomeContent';
import Section from '../../components/styledComponents/Section/Section';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <Section variant="home">
      <HomeContent />
    </Section>
  );
}
