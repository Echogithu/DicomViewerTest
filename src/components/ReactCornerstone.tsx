import { useEffect, useRef, useState } from "react"
// import cornerstone from "cornerstone-core"
import CornerstoneViewport from "react-cornerstone-viewport"
import cornerstoneTools from "cornerstone-tools"
import cornerstone from "cornerstone-core"

import initCornerstone from "../initCornerstone.js"
initCornerstone()

const imageIds = [
  "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm",
  "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm",
  "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
]

function ReactCornerstone() {
  const [activeViewportIndex, setActiveViewportIndex] = useState(0)
  const [imageIdIndex, setImageIdIndex] = useState(0)
  const [activeTool, setActiveTool] = useState("Zoom")
  const viewports = [0, 1]
  const vpRef = useRef()

  const tools = [
    {
      name: "Wwwc",
      mode: "active",
      modeOptions: { mouseButtonMask: 1 },
    },
    {
      name: "Zoom",
      mode: "active",
      modeOptions: { mouseButtonMask: 2 },
    },
    {
      name: "Pan",
      mode: "active",
      modeOptions: { mouseButtonMask: 4 },
    },
    // Scroll
    { name: "StackScrollMouseWheel", mode: "active" },
    // Touch
    { name: "PanMultiTouch", mode: "active" },
    { name: "ZoomTouchPinch", mode: "active" },
    { name: "StackScrollMultiTouch", mode: "active" },
  ]

  function CustomOverlay() {
    return (
      <div
        style={{
          position: "absolute",
          top: "15px",
          left: "15px",
          width: "100%",
          height: "100%",
          color: "white",
        }}
      >
        123
      </div>
    )
  }

  useEffect(() => {
    if (vpRef) {
      const scrollSyn = new cornerstoneTools.Synchronizer(
        "cornerstonetoolsstackscroll",
        cornerstoneTools.stackScrollSynchronizer
      )
      // console.log("scrollSyn :>> ", scrollSyn)

      const wwwcSyn = new cornerstoneTools.Synchronizer(
        "cornerstoneimagerendered",
        cornerstoneTools.wwwcSynchronizer
      )

      const zoomSyn = new cornerstoneTools.Synchronizer(
        "cornerstoneimagerendered",
        cornerstoneTools.panZoomSynchronizer
      )

      const res = document.getElementsByClassName("viewport-element")
      const left = res[0]
      const right = res[1]

      cornerstone.enable(left)
      cornerstone.enable(right)

      scrollSyn.add(left)
      scrollSyn.add(right)

      wwwcSyn.add(left)
      wwwcSyn.add(right)

      zoomSyn.add(left)
      zoomSyn.add(right)
    }
  }, [vpRef])

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }} ref={vpRef}>
      {viewports.map((viewportIndex) => (
        <CornerstoneViewport
          key={viewportIndex}
          style={{ minWidth: "45%", height: "256px", flex: "1" }}
          tools={tools}
          imageIds={imageIds}
          imageIdIndex={imageIdIndex}
          className={activeViewportIndex === viewportIndex ? "active" : ""}
          activeTool={activeTool}
          setViewportActive={() => {
            setActiveViewportIndex(viewportIndex)
          }}
        />
      ))}
    </div>
  )
}

export default ReactCornerstone
