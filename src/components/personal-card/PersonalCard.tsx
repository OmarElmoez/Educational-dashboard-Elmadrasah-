/* TODO:
*   1- receive an array of menu items, each one with icon and text
*   2- receive a person object contains label, name, role, img
*   3- after finishing this component use it in join pages for teacher and student */
import {Card} from "@/components/UI";

import ImgPlaceholder from '@/assets/person-placeholder.svg?react'
import GraduationIcon from '@/assets/Graduation_ hat.svg?react';
import LanguageIcon from '@/assets/Language.svg?react';
import EgyptFlag from '@/assets/big-flag-egypt.svg?react';

import styles from './personalCard.module.css'
import {ReactNode} from "react";
import {Heading} from "@/components/UI";

const {
  personal_info,
  img_box,
  text_box
} = styles;

type TPersonalCardProps = {
  children: ReactNode;
}

const PersonalCard = ({children}: TPersonalCardProps) => {
  return (
    <Card>
      <Heading text="تفاصيل المُعلم" style={{ fontSize: "3.2rem", marginTop: '0', marginBottom: '0' }} />

      <section className={personal_info}>
        <div className={img_box}>
          {/* person.img */}
          <ImgPlaceholder/>
        </div>
        <div className={text_box}>
          {/* person.name */}
          <h4>أحمد محمد</h4>
          {/* person.role */}
          <p>أستاذ مادة العلوم</p>
        </div>
      </section>

      <>
        {children}
      </>

      <menu>
        <li>
          <GraduationIcon/>
          <span>مدرس معتمد+10 عدد سنوات الخبرة</span>
        </li>

        <li>
          <LanguageIcon/>
          <span>لغة المادة : عربي</span>
        </li>

        <li>
          <EgyptFlag/>
          <span>الدولة: مصري</span>
        </li>
      </menu>
    </Card>
  )
}

export default PersonalCard;