import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { filterMap } from "../../utils/utils";

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

import { INLINE_CREATE_ID } from "../../constants/app";

const oneDay = 1000 * 60 * 60 * 24;

const initalState = [
  {
    name: "src",
    type: "folder",
    updated: 112312312,
    parent: "root",
    id: 1,
  },
  {
    name: "index.html",
    type: "file",
    updated: Date.now() - oneDay * 2,
    parent: "root",
    id: 7,
  },
  {
    name: "applicationCache.js",
    type: "file",
    updated: Date.now() - oneDay * 5,
    parent: 1,
    id: 2,
  },
  {
    name: "features",
    type: "folder",
    updated: Date.now() - oneDay * 14,
    parent: 1,
    id: 3,
  },
  {
    name: "applicationCache.js",
    type: "file",
    updated: Date.now() - oneDay * 365,
    parent: 3,
    id: 4,
  },
  {
    name: "dist",
    type: "folder",
    updated: 112312312,
    parent: "root",
    id: 6,
  },
];

export const fileSystemSlice = createSlice({
  name: "navigator",
  initialState: initalState,

  reducers: {
    startInline: (state, action) => {
      state.push(action.payload);
    },

    stopInline(state) {
      const index = state.findIndex((el) => el.id === INLINE_CREATE_ID);
      state.splice(index, 1);
    },

    create: (state, action) => {
      const { type, name, parent } = action.payload;
      const updated = Date.now();
      state.push({ name, parent, updated, type, id: v4() });
    },

    editItem: (state, action) => {
      const updated = Date.now();
      const index = state.findIndex((el) => el.id === action.payload.id);
      const el = { ...state[index], ...action.payload, updated };
      state.splice(index, 1, el);
    },
    deleteItem: (state, action) => {
      const index = state.findIndex((el) => el.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const {
  create,
  editItem,
  deleteItem,
  startInline,
  stopInline,
} = fileSystemSlice.actions;

export const buildTree = (arr, id = "root") => {
  return filterMap(
    [...arr].sort((a, b) => {
      if (a.type === "folder" && b.type === "file") {
        return -1;
      }
      if (a.type === "file" && b.type === "folder") {
        return 1;
      }
      return 0;
    }),
    (el) => el.parent === id,
    (el) => ({ ...el, nested: buildTree(arr, el.id) })
  );
};

export const getFlatFs = (state) => state.navigator;

export const getFsByIdPure = (items) =>
  items.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
export const getFsById = createSelector(getFlatFs, getFsByIdPure);

export const getFsTreePure = (navigator) => buildTree(navigator);
export const getFsTree = createSelector(getFlatFs, getFsTreePure);

export const getInlineCreatePure = (mapById) => mapById[INLINE_CREATE_ID];
export const getInlineCreate = createSelector(getFsById, getInlineCreatePure);

export const getAncestorsPure = (fsItems, fsItemsById, id) => {
  const result = [];
  const getParent = (id) => {
    const el = fsItemsById[id];
    if (id !== "root" && el && el.id !== "root" && el.parent) {
      result.push(el);
      getParent(el.parent);
    }
  };

  if (!id) {
    return result;
  }

  getParent(id);
  return result.reverse();
};
export const getAncestors = (id) =>
  createSelector(getFlatFs, getFsById, (fsItems, fsItemsById) =>
    getAncestorsPure(fsItems, fsItemsById, id)
  );

export default fileSystemSlice.reducer;
