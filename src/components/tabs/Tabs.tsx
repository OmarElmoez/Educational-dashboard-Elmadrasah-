import styles from './tabs.module.css'
import {JSX, useState, ComponentType} from "react";

const {header, header_tab, active} = styles;

export type TTab = {
  id: number,
  label: string,
  content: ComponentType<any> | (() => JSX.Element),
  contentProps?: Record<string, unknown>;
}

type TTabsPros = {
  tabs: TTab[],
}

const Tabs = ({tabs}: TTabsPros) => {

  const [activeId, setActiveId] = useState(1)

  const renderContent = () => {
    const activeTab = tabs[activeId];

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
            <span key={tab.id} className={`${header_tab} ${activeId === tab.id && active}`}
                  onClick={() => setActiveId(tab.id)}>{tab.label}</span>
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