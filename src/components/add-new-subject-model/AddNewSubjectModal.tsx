import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./addNewSubjectModal.module.css";
import { InputField, Row } from "@/components";
import { useForm } from "react-hook-form";
import AddSubjectSchema, {
  TAddSubjectFormData,
} from "@/schemas/AddSubjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  actPostNewSubject,
} from "@/store/form-subjects/FormSubjectsSlice";
import { actGetDropdownOptions } from "@/store/single-actions";
const { modal, modal_actions, modal__title, modal__form } = styles;

const AddNewSubjectModal = forwardRef((_, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();
  // const { credentials } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.formSubjects);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TAddSubjectFormData>({
    resolver: zodResolver(AddSubjectSchema),
  });

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  const onSubmit = (data: TAddSubjectFormData) => {
    dispatch(actPostNewSubject({ data }))
      .unwrap()
      .then(() => {
        reset();
        dialog.current?.close();
        dispatch(actGetDropdownOptions({ optionsFor: "subjects" }));
      });
  };

  const onCloseHandler = () => {
    reset();
    dialog.current?.close();
  };

  return createPortal(
    <dialog ref={dialog} className={modal}>
      <h2 className={modal__title}>إضافة موضوع جديد</h2>
      <form method="POST" onSubmit={handleSubmit(onSubmit)} className={modal__form}>
        <Row>
          <InputField
            label="اسم المادة بالعربية"
            name="name_ar"
            placeholder="الرياضيات"
            register={register}
            error={errors.name_ar?.message as string}
          />
        </Row>

        <Row>
          <InputField
            label="اسم المادة بالانجليزية"
            name="name_en"
            placeholder="math"
            register={register}
            error={errors.name_en?.message as string}
          />
        </Row>

        <section className={modal_actions}>
          <button type="submit" className="btn submit-btn">
            {loading === "pending" ? "...جاري الإضافة" : "إضافة"}
          </button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={onCloseHandler}
          >
            يُلغي
          </button>
        </section>
      </form>
    </dialog>,
    document.getElementById("modal")!
  );
});

AddNewSubjectModal.displayName = "AddNewSubjectModal";

export default AddNewSubjectModal;
