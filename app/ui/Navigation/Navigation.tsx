import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';

export default function Navigation() {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
    return clsx(css.link, isActive && css.isActive);
  };

  return (
    <nav className={css.nav}>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>
      <NavLink className={getLinkClass} to="/psychologists">
        Psychologists
      </NavLink>
      <NavLink className={getLinkClass} to="/favorites">
        Favorites
      </NavLink>
    </nav>
  );
}
