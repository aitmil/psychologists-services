import { Link } from 'react-router-dom';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <Link className={css.logo} to={'/'}>
      <span className={css.part1}>psychologists</span>
      <span className={css.part2}>.</span>
      <span className={css.part3}>services</span>
    </Link>
  );
}
