import { OTPInput, SlotProps } from 'input-otp'
import { cn } from "@/utils/util.ts";
import OtpEmailIcon from '@/assets/otp-email.svg?react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/UI";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useComponentLoading } from "@/hooks";
import ResetPasswordServices from '@/services/resetPassword';

const otpSchema = z.object({
  otp: z.string()
  .nullish()
  .transform(val => val || '')
  .pipe(
    z.string()
    .min(1, 'برجاء ادخال الOTP')
    .min(6, 'يجب إدخال 6 أرقام')
    .max(6, 'يجب إدخال 6 أرقام')
    .regex(/^\d+$/, 'يجب إدخال أرقام فقط')
  )
});

export type OtpFormData = z.infer<typeof otpSchema>;


function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-[2px] h-8 bg-[var(--main-color)]"/>
    </div>
  )
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative w-[60px] h-[60px] text-[2rem]',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border-border border-y border-r border-l rounded-lg border-[#1C8A44]',
        'group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20',
        'outline-0 outline-accent-foreground/20',
        {'outline-accent-foreground': props.isActive},
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
      {props.hasFakeCaret && <FakeCaret/>}
    </div>
  )
}

const OtpCode = () => {

  const {state} = useLocation();

  const {isPending, setPending, setSucceeded} = useComponentLoading();

  const navigate = useNavigate();

  const {
    control, handleSubmit, formState: {errors}
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: any) => {
    const submittedData = state.data;
    submittedData.otp = data.otp;
    await ResetPasswordServices.verifyOtp(submittedData).then((res)=>{
      if(res?.status === 200) {
        setSucceeded();
        navigate('/set-password', {
          state: {
            submittedData
          },
        })
      }else{
        console.log(res);
      }
    }).catch((err)=>{
      console.log(err);
      setPending();
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <OtpEmailIcon style={{marginInline: 'auto'}}/>
      <h2 className="text-black font-medium text-[2rem] mt-[4rem] text-center">يرجى التحقق من البريد الإلكتروني الخاص بك</h2>
      <p className="text-[1.6rem] mt-[3rem] text-center text-black">لقد أرسلنا رمزًا إلى {state.data.email}</p>
      <Controller
        name="otp"
        control={control}
        render={({field}) => (
          <>
            <OTPInput
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              containerClassName="group flex items-center has-[:disabled]:opacity-30 mt-[3rem]"
              render={({slots}) => (
                <>
                  <div className="flex flex-row-reverse gap-[2.4rem] ">
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} />
                    ))}
                  </div>
                </>
              )}
            />
            {errors.otp && (
              <p className="text-red-500 text-[1.4rem] mt-2 text-center">{errors.otp.message}</p>
            )}

          </>
        )}
      />
      <p className="text-[#838383] text-center">لم تحصل على الرمز؟ <span className="underline decoration-1 cursor-pointer" onClick={() => console.log('resend')}>انقر لإعادة الإرسال</span></p>
      <Button style={{
        width: '131px',
        height: '48px',
        paddingBlock: '14.5px',
        marginTop: '3rem',
        marginInline: 'auto'
      }}
              disableKey={isPending}
      >{isPending ?  "برجاء الانتظار..." : "تاكيد"}</Button>
    </form>
  )
}

export default OtpCode;
