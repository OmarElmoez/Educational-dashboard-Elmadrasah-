import styles from './tabs.module.css'
import { JSX, ComponentType, useContext } from "react";
import { CalendarContext } from "@/store/context/CalendarContext.tsx";

const {header, header_tab, active} = styles;

export type TTab = {
  id: number,
  label: string,
  content: ComponentType<any> | (() => JSX.Element),
  contentProps?: Record<string, unknown>;
  handleTabClick?: () => void;
}

type TTabsPros = {
  tabs: TTab[],
  customActiveTab?: number,
}

const Tabs = ({tabs, customActiveTab}: TTabsPros) => {

  const {activeId, setActiveId} = useContext(CalendarContext);


  const renderContent = () => {
    const activeTab = customActiveTab ? tabs[customActiveTab - 1] : tabs[activeId];

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
            <span key={tab.id} className={`${header_tab} ${(customActiveTab ? (customActiveTab - 1) : activeId) === tab.id && active}`}
                  onClick={() => {
                    setActiveId(tab.id);
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