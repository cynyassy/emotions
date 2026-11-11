import { SoundToggle } from '../audio/SoundToggle';
import './portfolio-frame.css';

export function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <a className="portfolio-brand" href="https://cynyassy.github.io/" aria-label="Cynyassy home">cynyassy<sup>®</sup></a>
        <nav aria-label="Portfolio">
          <a href="https://cynyassy.github.io/#projects">Work</a>
          <a href="https://cynyassy.github.io/#about">About</a>
          <a href="https://cynyassy.github.io/#contact">Contact</a>
        </nav>
        <SoundToggle />
      </div>
    </header>
  );
}
