import { useAppDispatch, useAppSelector } from "@/store/hooks";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import styles from "./multiChoices.module.css";

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
}: {
  register: UseFormRegister<T>;
  name: Path<T>;
}) => {
  const [isWrapperClicked, setIsWrapperClicked] = useState(false);
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const url =
          "https://elmadrasah-development-ff14bf466889.herokuapp.com/employee/subject/";
        const config = {
          headers: {
            Authorization: `Token ${user?.token}`,
          },
        };
        const response = await axios.get(url, config);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSubjects();
  }, [dispatch, user?.token]);

  const onClickHandler = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      const { value } = e.currentTarget;
      const isSelected = selectedSubjects.includes(Number(value));
      if (isSelected) {
        setSelectedSubjects(
          selectedSubjects.filter((item) => item !== Number(value))
        );
      } else {
        setSelectedSubjects([...selectedSubjects, Number(value)]);
      }

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
    [selectedSubjects]
  );

  const renderPreview = () => {
    if (selectedSubjects.length === 0) {
      return <span className="firstOption">المواد</span>;
    }

    return selectedSubjects.map((subject) => (
      <span key={subject} className={preview}>
        {data.find((subject2) => subject2.id === subject)?.name}
      </span>
    ));
  };



  return (
    <article className="group">
      <label htmlFor="" className="adminFormLabel">
        يرجي اختيار المواد
      </label>
      <section
        className="select_wrapper inputField"
        onClick={() => setIsWrapperClicked(!isWrapperClicked)}
        onBlur={() => setIsWrapperClicked(false)}
      >
        {renderPreview()}
      </section>
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
