import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  loading: false,
  loadingMessage: '',
  story: null,
  chapters: [],
  selectedChapters: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload.loading, loadingMessage: action.payload.message };
    case 'SET_STORY':
      return { ...state, story: action.payload };
    case 'SET_CHAPTERS':
      return { ...state, chapters: action.payload };
    case 'TOGGLE_CHAPTER_SELECTION':
      const { chapter, isSelected } = action.payload;
      const newSelectedChapters = isSelected
        ? [...state.selectedChapters, chapter]
        : state.selectedChapters.filter(c => c.sourceUrl !== chapter.sourceUrl);
      return { ...state, selectedChapters: newSelectedChapters };
    case 'SELECT_ALL_CHAPTERS':
      return { ...state, selectedChapters: [...state.chapters] };
    case 'SELECT_NONE_CHAPTERS':
      return { ...state, selectedChapters: [] };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
