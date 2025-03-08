import { useAppDispatch } from "@/store/hooks";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import styles from "./multiChoices.module.css";
import { END_POINTS } from "@/constants";
import actGetChoices, { TResponse } from "@/store/single-actions/actGetChoices";
import { useDebounce } from "@/hooks";

const {
  checkboxInput,
  checkboxItem,
  checkmark,
  checked,
  options,
  checkboxLabel,
  preview,
  // loadingIndicator,
  // circularProgress,
  select_box_flex,
  close_btn,
  search_box,
} = styles;

// const LoadingIndicator = ({ progress }: { progress: number }) => (
//   <div className={loadingIndicator}>
//     <svg viewBox="0 0 36 36" className={circularProgress}>
//       <path
//         d="M18 2.0845
//           a 15.9155 15.9155 0 0 1 0 31.831
//           a 15.9155 15.9155 0 0 1 0 -31.831"
//         fill="none"
//         stroke="#1C8A44"
//         strokeWidth="4"
//         strokeDasharray={`${progress}, 100`}
//       />
//     </svg>
//   </div>
// );

const MultiChoices = <T extends FieldValues>({
                                               register,
                                               name,
                                               error,
                                               isRequired,
                                               disabled = false,
                                               fields,
                                               predefinedChoices,
                                               removePreviewChoices,
                                               position = "absolute",
  setValue,
                                             }: {
  register: UseFormRegister<T>;
  name: Path<T>;
  error: string;
  isRequired?: boolean;
  disabled?: boolean;
  fields?: TResponse;
  predefinedChoices?: number[];
  removePreviewChoices?: boolean;
  position?: "absolute" | "relative";
  setValue?: (name: Path<T>, value: number[]) => void;
}) => {
  const [isWrapperClicked, setIsWrapperClicked] = useState(false);
  const [data, setData] = useState<TResponse>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  useEffect(() => {
    if (predefinedChoices) {
      setSelectedChoices(predefinedChoices);
    }
  }, [predefinedChoices]);
  // const [loadingProgress, setLoadingProgress] = useState(0);
  // const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (removePreviewChoices) {
      setSelectedChoices([]);
    }
  }, [removePreviewChoices]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!fields) {
      dispatch(
        actGetChoices({
          // url: END_POINTS[name as keyof typeof END_POINTS].url,
          url: END_POINTS[name as keyof typeof END_POINTS].url,
        })
      )
        .unwrap()
        .then((data) => {
          setData(data);
        });
    }
  }, [dispatch, name, fields]);

  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      // if (intervalRef.current !== null) {
      //   clearInterval(intervalRef.current);
      // }

      const { value } = e.currentTarget;
      const isSelected = selectedChoices.includes(Number(value));
      if (isSelected) {
        setSelectedChoices(
          selectedChoices.filter((item) => item !== Number(value))
        );
      } else {
        setSelectedChoices([...selectedChoices, Number(value)]);
      }

      // setLoadingProgress(0);
      // intervalRef.current = window.setInterval(() => {
      //   setLoadingProgress((prev) => {
      //     if (prev >= 100) {
      //       if (intervalRef.current !== null) {
      //         clearInterval(intervalRef.current);
      //       }
      //       setTimeout(() => {
      //         setIsWrapperClicked(false);
      //       }, 0);
      //       return 100;
      //     }
      //     return prev + 10;
      //   });
      // }, 500);
    },
    [selectedChoices]
  );

  const onRemove = useCallback(
    (value: number | string, e: React.MouseEvent) => {
      e.stopPropagation();

      const isSelected = selectedChoices.includes(Number(value));
      if (isSelected) {
        setSelectedChoices(
          selectedChoices.filter((item) => item !== Number(value))
        );
      }
    },
    [selectedChoices]
  );

  setValue && setValue(name, selectedChoices)

  const renderPreview = () => {
    if (disabled || selectedChoices.length === 0) {
      return (
        <span className="firstOption">
          {END_POINTS[name as keyof typeof END_POINTS].placeholder}
        </span>
      );
    }

    return selectedChoices.map((choice) => (
      <span
        key={choice}
        className={preview}
        style={{ position: "relative", paddingLeft: "2rem" }}
      >
        {
          (fields ? fields : data).find((dataItem) => dataItem.id === choice)
            ?.name
        }
        <button
          type="button"
          className={close_btn}
          onClick={(e) => onRemove(choice, e)}
        >
          <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.77623 2.50001L4.9428 0.333429C5.01908 0.25715 5.01908 0.133479 4.9428 0.0572094C4.86652 -0.01906 4.74285 -0.0190698 4.66658 0.0572094L2.5 2.22379L0.33343 0.0572094C0.25715 -0.0190698 0.133479 -0.0190698 0.0572094 0.0572094C-0.01906 0.133488 -0.0190698 0.25716 0.0572094 0.333429L2.22378 2.5L0.0572094 4.66657C-0.0190698 4.74285 -0.0190698 4.86653 0.0572094 4.94279C0.0953441 4.98093 0.145334 4.99999 0.195324 4.99999C0.245314 4.99999 0.295295 4.98093 0.333439 4.94279L2.5 2.77623L4.66657 4.94279C4.7047 4.98093 4.75469 4.99999 4.80468 4.99999C4.85467 4.99999 4.90465 4.98093 4.9428 4.94279C5.01908 4.86652 5.01908 4.74284 4.9428 4.66657L2.77623 2.50001Z"
              fill="black"
            />
          </svg>
        </button>
      </span>
    ));
  };

  const filteredData = data?.filter((item) =>
    item.codename
      ? item.codename.toLowerCase().includes(debouncedQuery.toLowerCase())
      : item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <article className="group">
      <label
        htmlFor={name}
        className={`adminFormLabel ${isRequired && "required"}`}
      >
        {/* يرجي اختيار {END_POINTS[name as keyof typeof END_POINTS].placeholder} */}
        {fields
          ? `${END_POINTS[name as keyof typeof END_POINTS].placeholder}`
          : ` يرجي اختيار ${
              END_POINTS[name as keyof typeof END_POINTS].placeholder
            }`}
      </label>
      <section
        className={`select_wrapper inputField ${select_box_flex} ${
          disabled && "disabled_btn"
        }`}
        onClick={() => {
          if (!disabled) {
            setIsWrapperClicked(!isWrapperClicked);
          }
        }}
      >
        {renderPreview()}
      </section>
      {error && <span className="error">{error}</span>}
      {isWrapperClicked && (
        <section className={options} style={{position: position === 'absolute' ? 'absolute' : 'relative'}}>
          <input
            type="search"
            className={`inputField ${search_box}`}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="ابحث"
          />
          <div style={{ marginTop: "1rem" }}>
            {/*<LoadingIndicator progress={loadingProgress} />*/}
            {(filteredData ? filteredData : data).map((item) => (
              <label key={item.id} className={checkboxItem}>
                <span
                  className={`${checkmark}  ${
                    !disabled && selectedChoices.includes(item.id)
                      ? checked
                      : ""
                  } `}
                ></span>
                <input
                  type="checkbox"
                  className={checkboxInput}
                  value={item.id}
                  {...register(name)}
                  onClick={onClickHandler}
                  checked={selectedChoices.includes(item.id)}
                  disabled={disabled}
                />
                <span className={checkboxLabel}>
                  {item.codename ? item.codename : item.name}
                </span>
              </label>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default MultiChoices;
