import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import styles from "./multiChoices.module.css";
import { END_POINTS } from "@/constants";
import actGetChoices, { TResponse } from "@/store/single-actions/actGetChoices";

const {
  checkboxInput,
  checkboxItem,
  checkmark,
  options,
  checkboxLabel,
  preview,
  loadingIndicator,
  circularProgress,
} = styles;

const LoadingIndicator = ({ progress }: { progress: number }) => (
  <div className={loadingIndicator}>
    <svg viewBox="0 0 36 36" className={circularProgress}>
      <path
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#1C8A44"
        strokeWidth="4"
        strokeDasharray={`${progress}, 100`}
      />
    </svg>
  </div>
);

const MultiChoices = <T extends FieldValues>({
  register,
  name,
  error,
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
  error: string;
}) => {
  const [isWrapperClicked, setIsWrapperClicked] = useState(false);
  const [data, setData] = useState<TResponse>([]);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      actGetChoices({
        token: user?.token,
        url: END_POINTS[name as keyof typeof END_POINTS].url,
      })
    )
      .unwrap()
      .then((data) => setData(data));
  }, [dispatch, user?.token, name]);

  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      const { value } = e.currentTarget;
      const isSelected = selectedChoices.includes(Number(value));
      if (isSelected) {
        setSelectedChoices(
          selectedChoices.filter((item) => item !== Number(value))
        );
      } else {
        setSelectedChoices([...selectedChoices, Number(value)]);
      }

      console.log(value);

      setLoadingProgress(0);
      intervalRef.current = window.setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
            }
            setTimeout(() => {
              setIsWrapperClicked(false);
            }, 0);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    },
    [selectedChoices]
  );

  const renderPreview = () => {
    if (selectedChoices.length === 0) {
      return (
        <span className="firstOption">
          {END_POINTS[name as keyof typeof END_POINTS].placeholder}
        </span>
      );
    }

    return selectedChoices.map((choice) => (
      <span key={choice} className={preview}>
        {data.find((dataItem) => dataItem.id === choice)?.name}
      </span>
    ));
  };

  return (
    <article className="group">
      <label htmlFor={name} className="adminFormLabel">
        يرجي اختيار {END_POINTS[name as keyof typeof END_POINTS].placeholder}
      </label>
      <section
        className="select_wrapper inputField"
        onClick={() => setIsWrapperClicked(!isWrapperClicked)}
        onBlur={() => setIsWrapperClicked(false)}
      >
        {renderPreview()}
      </section>
      {error && <span className="error">{error}</span>}
      {isWrapperClicked && (
        <section className={options}>
          <LoadingIndicator progress={loadingProgress} />
          {data.map((item) => (
            <label key={item.id} className={checkboxItem}>
              <span className={checkmark}></span>
              <input
                type="checkbox"
                className={checkboxInput}
                value={item.id}
                {...register(name)}
                onClick={onClickHandler}
              />
              <span className={checkboxLabel}>{item.name}</span>
            </label>
          ))}
        </section>
      )}
    </article>
  );
};

export default MultiChoices;
