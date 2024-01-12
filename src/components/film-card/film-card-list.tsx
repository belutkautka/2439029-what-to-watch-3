import {Film} from 'types/film.ts';
import FilmCard from '@components/film-card/film-card.tsx';
import {useState} from 'react';
import {TimeoutId} from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

type FilmCardListProps = {
  films: Film[];
}

function FilmCardList({films}: FilmCardListProps) {
  const [activeFilm, setSelectedFilm] = useState<string | null>(null);
  let timer: undefined | TimeoutId = undefined;

  const handleFocus = (id: string) => {
    timer = setTimeout(() => {
      setSelectedFilm(id);
    }, 2000);
  };

  const handleFocusOff = () => {
    clearTimeout(timer);
    setSelectedFilm(null);
  };
  return (
    <>
      {films.map((film) => (<FilmCard key={film.id} film={film} activeFilm={activeFilm} onMouseOver={handleFocus} onMouseOut={handleFocusOff}/>))}
    </>
  );
}

export default FilmCardList;
