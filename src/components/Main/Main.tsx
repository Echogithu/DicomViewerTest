import { useEffect, useState } from "react"
import DVComponent from "./DVComponent"
import EmptyDVComponent from "./DVComponent/EmptyDVComponent"
import "./index.css"

function Main(props: any) {
  // const [layout, setLayout] = useState([2, 2])
  const { layout } = props
  const [activeDcmIndex, setActiveDcmIndex] = useState(0)
  const [dVComponents, setDVComponents] = useState<any>([])

  useEffect(() => {
    fetchDicomViewers()
  }, [])

  // useEffect(() => {
  //   if (getCurSeriesKeys[0] && dVComponents.length > 0) {
  //     setDVComponent(getCurSeriesKeys[0], activeDcmIndex);
  //   }
  // }, [getCurSeriesKeys[0]]);

  // useEffect(() => {
  //   console.log("activeDcmIndex", dVComponents[activeDcmIndex])
  //   if (dVComponents[activeDcmIndex]) {
  //     const curDVComponent = dVComponents[activeDcmIndex]
  //     console.log("curDVComponent: ", curDVComponent)
  //     // curDVComponent.addListener('mouseup', () => {
  //     //   console.log('11111111111 :>> ');
  //     // });
  //   }
  //   // if(curDVComponent) {
  //   //   curDVComponent.addEventList
  //   // }
  // }, [activeDcmIndex])

  function fetchDicomViewers() {
    let list = []
    for (let i = 0; i < 16; i++) {
      list.push(setEmptyDVComponent())
    }
    setDVComponents(list)
  }

  function setEmptyDVComponent() {
    return <EmptyDVComponent />
  }

  function setDVComponent(
    curSelectedSeriesKey: string,
    activeDcmIndex: number
  ) {
    let list = dVComponents
    for (let i = 0; i < list.length; i++) {
      if (i === activeDcmIndex) {
        list[i] = (
          <DVComponent
            dVIndex={activeDcmIndex}
            // dVSeriesKey={curSelectedSeriesKey}
          />
        )
      }
    }
    setDVComponents(list)
  }

  function getDVComponent(index: number) {
    return dVComponents[index]
  }

  function layoutGridClick(index: number) {
    if (index === activeDcmIndex) return
    setActiveDcmIndex(index)
  }

  // function - 构建布局
  function buildLayoutGrid() {
    let layoutGridItems = []
    for (let i = 0; i < layout[0]; i++) {
      for (let j = 0; j < layout[1]; j++) {
        // 4 * 4
        const index = i * 4 + j
        layoutGridItems.push(
          <div
            key={index}
            className={`${"layoutGridItem"}  ${
              activeDcmIndex === index ? "active" : ""
            }`}
            onClick={() => layoutGridClick(index)}
          >
            {getDVComponent(index)}
          </div>
        )
      }
    }

    return (
      <div
        id="JDicomViewerGrid"
        className="layoutGrid"
        style={{
          gridTemplateRows: `repeat(${layout[0]}, ${100 / layout[0]}%)`,
          gridTemplateColumns: `repeat(${layout[1]}, ${100 / layout[1]}%)`,
        }}
      >
        {layoutGridItems}
      </div>
    )
  }

  return <div className="Main">{buildLayoutGrid()}</div>
}

export default Main
