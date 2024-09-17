// import { FieldValues, Path, UseFormRegister } from "react-hook-form";

// import { CheckboxGroup, Heading, RadioField, Row } from "@/components";

// export interface TCalendarSettingsFormProps<T extends FieldValues> {
//   register: UseFormRegister<T>;
//   name: Path<T>;
// }

// const CalendarSettingsForm = <T extends FieldValues>({
//   register,
//   name,
// }: TCalendarSettingsFormProps<T>) => {
//   return (
//     <div>
//       <Heading text="التقويم" />

//       <RadioField
//         name={name}
//         label="Select your gender"
//         options={[
//           { label: "Male", value: "male" },
//           { label: "Female", value: "female" },
//           { label: "Other", value: "other" },
//         ]}
//         register={register}
//         error={errors.gender?.message}
//         isRequired={true}
//       />

//       <Row>
//         <CheckboxGroup
//           register={register}
//           name={name}
//           options={[
//             { label: "Option 1", value: "option1" },
//             { label: "Option 2", value: "option2" },
//           ]}
//           isRequired={true}
//         />
//         <article className="group"></article>
//       </Row>

//       <hr className="hr" />
//     </div>
//   );
// };

// export default CalendarSettingsForm;
