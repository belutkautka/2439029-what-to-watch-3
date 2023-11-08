import CatalogGenres from '@components/catalog-genres.tsx';
import {CatalogGenreValues} from '@components/catalog-genres.tsx';
import Footer from '@components/footer/footer.tsx';
import {Film} from 'types/film.ts';
import Logo from '@components/header/logo.tsx';
import UserPage from '@components/header/user-page.tsx';
import FilmCardList from '@components/film-card/film-card-list.tsx';

type MainPageProps = {
  currentFilm: Film;
  otherFilms: Film[];
  myListCount: number;
}

function MainPage(props: MainPageProps) {
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={props.currentFilm.img} alt={props.currentFilm.title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header user-page__head">
          <Logo/>
          <UserPage/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={props.currentFilm.img} alt={props.currentFilm.title} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{props.currentFilm.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.currentFilm.genre}</span>
                <span className="film-card__year">{props.currentFilm.date}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox={`0 0 ${19} ${19}`}>
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{props.myListCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href={'#'} className="catalog__genres-link">{'All genres'}</a>
            </li>
            {CatalogGenreValues.map((g)=>(<CatalogGenres name={g}/>))}
          </ul>

          <div className="catalog__films-list">
            <FilmCardList films={props.otherFilms}/>
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
