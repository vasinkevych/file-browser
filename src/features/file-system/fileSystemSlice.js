import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { filterMap } from "../../utils/utils";

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

import { INLINE_CREATE_ID } from "../../constants/app";

const oneDay = 1000 * 60 * 60 * 24;

const structure = [
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
    updated: Date.now - oneDay * 2,
    parent: "root",
    id: 7,
  },
  {
    name: "applicationCache.js",
    type: "file",
    updated: Date.now - oneDay * 5,
    parent: 1,
    id: 2,
  },
  {
    name: "features",
    type: "folder",
    updated: Date.now - oneDay * 14,
    parent: 1,
    id: 3,
  },
  {
    name: "applicationCache.js",
    type: "file",
    updated: Date.now - oneDay * 365,
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
  initialState: structure,

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

export const getSelectedItem = (state) => state.navigator.selectedItem;

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

export const getFs = (state) => buildTree(state.navigator);
export const getFlatFs = (state) => state.navigator;
export const getInlineCreate = (state) =>
  state.navigator.find((el) => el.id === INLINE_CREATE_ID);
export const getItemById = (state, id) =>
  state.navigator.fs.find((el) => el.id === id);

export default fileSystemSlice.reducer;
