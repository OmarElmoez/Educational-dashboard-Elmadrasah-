import styles from './tabs.module.css'
import {ReactNode, useState} from "react";

const {header_tab, active} = styles;

type TTab = {
  id: number,
  label: string,
  description?: string,
  content: ReactNode
}

type TTabsPros = {
  tabs: TTab[],
}

const Tabs = ({tabs}: TTabsPros) => {

  const [activeId, setActiveId] = useState(2)

  return (
    <>
      <header>
        {tabs.map((tab: TTab) => {
          return (
            <span key={tab.id} className={`${header_tab} ${activeId === tab.id && active}`}
                  onClick={() => setActiveId(tab.id)}>{tab.label}</span>
          )
        })}
      </header>

      <>
        {tabs[activeId].content}
      </>

    </>
  )
}

export default Tabs;