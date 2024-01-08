import {PromoFilm} from 'types/film.ts';
import {useAppSelector} from '@components/use-app/use-app.tsx';
import {getAuthorizationStatus} from '@store/user/selections.ts';

type PromoFilmProps = {
  promoFilm: PromoFilm | null;
  myListCount: number;
}

function PromoFilmInfo({promoFilm, myListCount}: PromoFilmProps) {
  const auth = useAppSelector(getAuthorizationStatus);
  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={promoFilm?.posterImage} alt={promoFilm?.name} width="218" height="327"/>
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">{promoFilm?.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{promoFilm?.genre}</span>
            <span className="film-card__year">{promoFilm?.released}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button">
              <svg viewBox={`0 0 ${19} ${19}`}>
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            {auth &&
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
                <span className="film-card__count">{myListCount}</span>
              </button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoFilmInfo;
