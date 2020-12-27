import React, { useState, useRef, useEffect } from "react";
import { VscCheck, VscClose } from "react-icons/vsc";
import styles from "./styles.module.css";

export const InlineCreate = ({
  item: { name, createdType, type, parent } = {},
  onCancel,
  onSave,
}) => {
  const [value, setValue] = useState(name);
  const ref = useRef(null);
  const onSaveHandler = (e) => {
    if (value && value.trim()) {
      onSave({ type: createdType || type, parent, name: value });
    }
  };

  const onChange = (e) => {
    setValue(e.target.value.trim());
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  const onKeyDownhandler = (e) => {
    switch (e.key) {
      case "Enter":
        onSaveHandler(e);
        break;
      case "Escape":
        onCancel(e);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.inlineCreate}>
      <input
        ref={ref}
        onKeyDown={onKeyDownhandler}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
      <button onClick={onSaveHandler}>
        <VscCheck />
      </button>
      <button onClick={onCancel}>
        <VscClose />
      </button>
    </div>
  );
};
