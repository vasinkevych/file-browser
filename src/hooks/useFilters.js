import React, { useContext, createContext, useMemo, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "showFolderOnly":
      return {
        ...state,
        showFolderOnly: action.payload,
      };
    case "filterByDate":
      return {
        ...state,
        date: action.payload,
      };

    default:
      return state;
  }
};

const filterContext = createContext(null);

export function ProvideFilters({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    date: null,
    showFolders: true,
  });
  const actions = useMemo(
    () => ({
      showFolderOnly: (value) => {
        dispatch({
          type: "showFolderOnly",
          payload: value,
        });
      },
      filterByDate: (date) => {
        dispatch({
          type: "filterByDate",
          payload: date,
        });
      },
    }),
    []
  );

  return (
    <filterContext.Provider value={[state, actions]}>
      {children}
    </filterContext.Provider>
  );
}

export function useFilters() {
  return useContext(filterContext);
}
