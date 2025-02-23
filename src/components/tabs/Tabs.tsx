import styles from './tabs.module.css'
import { ComponentType, JSX, useContext } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";
import { useLocation } from "react-router-dom";

const {header, header_tab, active} = styles;

export type TTab = {
  id: number,
  label: string,
  content: ComponentType<any> | (() => JSX.Element),
  contentProps?: Record<string, unknown>;
  handleTabClick?: () => void;
  page: "classes" | "join-class";
}

type TTabsPros = {
  tabs: TTab[],
}

const Tabs = ({tabs}: TTabsPros) => {

  const {classesPageActiveId, setClassesPageActiveId, setJoinClassPageActiveId, joinClassPageActiveId} = useContext(
    CalendarContext);

  const {pathname} = useLocation();

  const activeTab = pathname.includes('classes') ? tabs[classesPageActiveId] : tabs[joinClassPageActiveId];

  const renderContent = () => {

    const Component = activeTab.content;
    return activeTab.contentProps
      ? <Component {...activeTab.contentProps} />
      : <Component/>;
  }

  return (
    <>
      <header className={header}>
        {tabs.map((tab: TTab) => {
          return (
            <span key={tab.id} className={`${header_tab} ${activeTab.id === tab.id && active}`}
                  onClick={() => {
                    tab.page === 'classes' ? setClassesPageActiveId(tab.id) : setJoinClassPageActiveId(tab.id)
                    tab.handleTabClick && tab.handleTabClick();
                  }}>{tab.label}</span>
          )
        })}
      </header>

      <>
        {renderContent()}
      </>

    </>
  )
}

export default Tabs;