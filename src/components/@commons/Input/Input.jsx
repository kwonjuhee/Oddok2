/* eslint-disable arrow-body-style */
import React, { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(
  ({ type, placeholder, maxLength, onChange, isInvalid, value, onEnterKeyPress, textLength, autoFocus }, ref) => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") onEnterKeyPress();
    };

    return (
      <div className={`${styles.text_field} ${isInvalid ? styles.invalid : ""}`}>
        <input
          className={styles.input}
          type={type ?? "text"}
          ref={ref}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          value={value}
          spellCheck="false"
          onKeyPress={handleKeyPress}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
        />
        {textLength !== undefined && (
          <span className={styles.text_length}>
            {textLength}/{maxLength}
          </span>
        )}
      </div>
    );
  },
);

export default Input;
