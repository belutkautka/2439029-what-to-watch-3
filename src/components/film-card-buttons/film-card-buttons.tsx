import {Link} from 'react-router-dom';

type FilmCardButtonsProps = {
  count: number;
}

function FilmCardButtons({count}: FilmCardButtonsProps) {
  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button">
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <button className="btn btn--list film-card__button" type="button">
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
        <span className="film-card__count">{count}</span>
      </button>
      <Link to="add-review.html" className="btn film-card__button">Add review</Link>
    </div>
  );
}

export default FilmCardButtons;
