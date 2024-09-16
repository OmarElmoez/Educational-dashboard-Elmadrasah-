import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import ExistIcon from "@/assets/exist.svg?react";

import styles from "./reviewForm.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Emoji_1 from "@/assets/emoji_1.svg?react";
import Emoji_2 from "@/assets/emoji_2.svg?react";
import Emoji_3 from "@/assets/emoji_3.svg?react";
import Emoji_4 from "@/assets/emoji_4.svg?react";
import Emoji_5 from "@/assets/emoji_5.svg?react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewSchema, TReview } from "@/schemas/ReviewSchema";
import { actPostReviewAnswers } from "@/store/review-questions/reviewSlice";
import { ReviewFeedback } from "@/components";
import { TModalRef } from "@/types/shared";
import displayFeedbackModal from "@/utils/displayFeedbackModal";

const { reviewForm, rateLabel } = styles;

type TModalProps = {
  lesson_id: number | undefined;
};

export type TEnteredData = {
  rate: number | null;
  answer: string | null;
  choices: number[];
};

const ReviewForm = forwardRef(({ lesson_id }: TModalProps, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const reviewDialog = useRef<TModalRef>(null);

  const [reviewFeedback, setReviewFeedback] = useState<"succeeded" | "failed">(
    "succeeded"
  );

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  const { records, loading, error } = useAppSelector(
    (state) => state.reviewQuestions
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TReview>({
    resolver: zodResolver(ReviewSchema),
  });

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TReview> = (data) => {
    const lesson = lesson_id;

    const questions: TEnteredData[] = [];

    records.forEach((record) => {
      let enteredData: TEnteredData = {
        rate: null,
        answer: "",
        choices: [],
      };

      switch (record.type) {
        case "rate":
          enteredData.rate = Number(data[record.id]);
          break;

        case "write":
          enteredData.answer = data[record.id] as string;
          break;

        default:
          enteredData.choices = data[record.id] as number[];
      }

      const questionDataFormat = {
        question: record.id,
        ...enteredData,
      };

      questions.push(questionDataFormat);
    });

    const formattedData: {
      lesson: number | undefined;
      questions: TEnteredData[];
      token: string | undefined;
    } = {
      lesson,
      questions,
      token: user?.token,
    };

    dispatch(actPostReviewAnswers(formattedData))
      .unwrap()
      .then(() => {
        reset();
        dialog.current?.close();
        displayFeedbackModal({
          ref: reviewDialog,
        });
      });
  };

  // if (loading === "failed") {
  //   // setReviewFeedback("failed");
  //   dialog.current?.close();
  //   dispatch(setInitialState());
  //   reset();
  //   displayFeedbackModal({
  //     ref: reviewDialog,
  //   });
  // }

  useEffect(() => {
    if (loading === "failed") {
      setReviewFeedback("failed");
      dialog.current?.close();
      // dispatch(setInitialState());
      reset();
      displayFeedbackModal({
        ref: reviewDialog,
      });
    }
  }, [loading, dispatch, reset]);

  const rateOptions = [
    { id: 1, emoji: <Emoji_1 />, value: "1" },
    { id: 2, emoji: <Emoji_2 />, value: "2" },
    { id: 3, emoji: <Emoji_3 />, value: "3" },
    { id: 4, emoji: <Emoji_4 />, value: "4" },
    { id: 5, emoji: <Emoji_5 />, value: "5" },
  ];

  return createPortal(
    <>
      <ReviewFeedback
        ref={reviewDialog}
        status={reviewFeedback}
        error={error ?? ""}
      />
      <dialog className={`${reviewForm} modal`} ref={dialog}>
        <header>
          <h1>نرجو منك مشاركة ملاحظاتك وآرائك حول الطالب</h1>
          <ExistIcon onClick={() => dialog.current?.close()} />
        </header>
        <section>
          <form action="post" onSubmit={handleSubmit(onSubmit)}>
            {records.map((record) => (
              <article key={record.id} className={styles.questionBox}>
                <h3>{record.question_ar}</h3>
                <section className={styles.answers}>
                  {record.type === "choice" &&
                    record.choice.map((choice) => (
                      <Controller
                        key={choice.id}
                        name={record.id.toString()}
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange, value } }) => (
                          <>
                            {Array.isArray(value) && (
                              <label key={choice.id}>
                                <input
                                  type="checkbox"
                                  value={choice.id}
                                  checked={value.includes(choice.id)}
                                  onChange={(e) => {
                                    const newValue = e.target.checked
                                      ? [...value, choice.id]
                                      : value.filter((v) => v !== choice.id);
                                    onChange(newValue);
                                  }}
                                />
                                {choice.choice_ar}
                              </label>
                            )}
                          </>
                        )}
                      />
                    ))}

                  {record.type === "rate" &&
                    rateOptions.map((option) => (
                      <Controller
                        key={option.id}
                        name={record.id.toString()}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <label key={option.id} className={rateLabel}>
                              <input
                                type="radio"
                                value={option.value}
                                checked={value === option.value}
                                onChange={(e) => {
                                  onChange(e.target.value);
                                }}
                              />
                              {option.emoji}
                            </label>
                          </>
                        )}
                      />
                    ))}

                  {record.type === "write" && (
                    <Controller
                      name={record.id.toString()}
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <textarea
                          value={value as string}
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                  )}
                </section>
                {errors[record.id] && (
                  <p className="error">{errors[record.id]?.message}</p>
                )}
              </article>
            ))}
            <button type="submit" disabled={loading === "pending" || error !== null}>
              {loading === "pending" ? "...جاري الارسال" : "ارسال"}
            </button>
            {error && (
              <p className="error" style={{ textAlign: "center" }}>
                {error}
              </p>
            )}
          </form>
        </section>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
});

ReviewForm.displayName = "ReviewForm";
ReviewForm.propTypes;

export default ReviewForm;
