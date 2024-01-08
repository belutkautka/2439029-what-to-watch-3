import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '@const/namespaces.ts';
import {CatalogGenre} from 'types/genre.ts';
import {Film, FilmCard, PromoFilm} from 'types/film.ts';
import {showedFilmsCount} from '@const/values.ts';
import {ReviewType} from 'types/review.ts';
import {fetchFilmsAction, fetchPromoFilmAction, getFilm} from '@api/api-action.ts';
import browserHistory from '../../browser-history.ts';
import {Paths} from '@const/paths.ts';

type initialStateType = {
  genre: CatalogGenre;
  genres: CatalogGenre[];
  filteredFilms: Film[];
  promoFilm: PromoFilm | null;
  allFilms: Film[];
  count: number;
  authorizationStatus: boolean;
  error: string | null;
  film: FilmCard | null;
  similarFilms: Film[];
  reviews: ReviewType[];
  section: 'Overview' | 'Details' | 'Reviews';
  isFilmsDataLoading: boolean;
  isFilmDataLoading: boolean;
  isPromoFilmLoading: boolean;
};

const initialState: initialStateType = {
  genre: 'All genres',
  genres: [],
  promoFilm: null,
  filteredFilms: [],
  allFilms: [],
  count: showedFilmsCount,
  authorizationStatus: false,
  error: null,
  film: null,
  similarFilms: [],
  reviews: [],
  section: 'Overview',
  isFilmsDataLoading: false,
  isFilmDataLoading: false,
  isPromoFilmLoading: false
};


export const FilmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    changeShowedFilms(state) {
      state.count = state.filteredFilms.length > state.count + showedFilmsCount
        ? state.count + showedFilmsCount : state.filteredFilms.length;
    },
    setError(state, action: {
      payload: string | null
    }) {
      state.error = action.payload;
    },
    setGenres(state, action: {
      payload: CatalogGenre[]
    }) {
      state.genres = action.payload;
    },
    setSection(state, action: {
      payload: 'Overview' | 'Details' | 'Reviews'
    }) {
      state.section = action.payload;
    },
    changeGenre(state, action: {
      payload: CatalogGenre
    }) {
      state.genre = action.payload;
      state.count = showedFilmsCount;
      if (state.genre === 'All genres') {
        state.filteredFilms = state.allFilms;
      } else {
        state.filteredFilms = state.allFilms.filter((film) =>
          film.genre === state.genre);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.allFilms = action.payload;
        state.filteredFilms = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(getFilm.pending, (state) => {
        state.isFilmDataLoading = true;
      })
      .addCase(getFilm.fulfilled, (state, action) => {
        const filmData = action.payload;
        state.film = filmData.filmCard;
        state.reviews = filmData.comments;
        state.similarFilms = filmData.moreLikeThis;
        state.isFilmDataLoading = false;
      })
      .addCase(getFilm.rejected, (state) => {
        state.isFilmDataLoading = false;
        browserHistory.push(Paths.NotFound());
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoFilmLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isPromoFilmLoading = false;
      });
  }
});


export const {changeShowedFilms, setError, setSection, setGenres, changeGenre} = FilmProcess.actions;
