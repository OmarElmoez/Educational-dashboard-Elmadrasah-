import { forwardRef, useImperativeHandle, useRef, } from "react";
import { createPortal } from "react-dom";

import styles from "./reviewForm.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewSchema, TReview } from "@/schemas/ReviewSchema";
import { actPostReviewAnswers } from "@/store/review-questions/reviewSlice";
import { StarRating } from "@/components";
import { useFeedback } from "@/store/context";


const {reviewForm} = styles;

type TModalProps = {
  lesson_id: number | undefined;
};

export type TEnteredData = {
  rate: number | null;
  answer: string | null;
  choices: number[];
};

const ReviewForm = forwardRef(({lesson_id}: TModalProps, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  const {records, loading} = useAppSelector(
    (state) => state.reviewQuestions
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    register,
    formState: {errors},
  } = useForm<TReview>({
    resolver: zodResolver(ReviewSchema),
  });

  const {credintials} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {openFeedbackModal} = useFeedback();

  const onSubmit: SubmitHandler<TReview> = (data) => {

    // const submittedValues = Object.values(data);
    //
    // if (!submittedValues[0] || !submittedValues[1] || !submittedValues[2]) {
    //   openFeedbackModal('failed', "برجاء اعطاء تقييم")
    //   return;
    // }

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
          enteredData.rate = Number(data[record.id]) || null;
          enteredData.answer = null;
          break;

        case "write":
          enteredData.answer = data[record.id] as string;
          enteredData.rate = null;
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
      token: credintials?.token,
    };

    dispatch(actPostReviewAnswers(formattedData))
    .unwrap()
    .then((res: any) => {
      if(res.status === 400) {
        openFeedbackModal("failed", JSON.parse(res.response).error)
        reset();
        return;
      }
      reset();
      dialog.current?.close();
      openFeedbackModal('succeeded', 'تم التقييم بنجاح')
    })
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

  return createPortal(
    <>
      <dialog className={`${reviewForm} modal py-[2.4rem] px-[1.6rem]`} ref={dialog}>
        <header>
          <div>
            <h1 className="text-[2rem] text-black font-medium">{credintials?.role === 'Teacher' ? 'تقييم الطالب' : 'تقييم المعلم'}</h1>
            <p className="mt-[1rem] text-[#A0A1A7] text-[1.4rem] font-base">إعطاء تعليق علي مستوي {credintials?.role === 'Teacher' ? 'الطالب' : 'المٌعلم'} خلال السيشن.</p>
          </div>
          {/*<ExistIcon onClick={() => dialog.current?.close()}/>*/}
        </header>
        <section>
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-[2rem]!">
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
                        render={({field: {onChange, value}}) => (
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
                      <StarRating name={record.id.toString()} setValue={setValue} register={register}/>
                  }

                  {record.type === "write" && (
                    <Controller
                      name={record.id.toString()}
                      control={control}
                      defaultValue=""
                      render={({field: {onChange, value}}) => (
                        <textarea
                          value={value as string}
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                          placeholder="اكتب معلوماتك الإضافية"
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
            <button
              type="submit"
              disabled={loading === "pending"}
            >
              {loading === "pending" ? "...جاري الارسال" : "ارسال"}
            </button>
            {/*{error && (*/}
            {/*  <p className="error" style={{textAlign: "center"}}>*/}
            {/*    {error}*/}
            {/*  </p>*/}
            {/*)}*/}
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
