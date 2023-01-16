import { useEffect, useRef } from "react"
import { RenderingEngine, Types, Enums } from "@cornerstonejs/core"
const { ViewportType } = Enums
import { initDemo } from "../utils/helpers"

function CornerstoneNew() {
  const imageIds = [
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
    "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm",
  ]
  const firstRef = useRef<any>()
  const renderingEngineId = "myRenderingEngine"
  const renderingEngine = new RenderingEngine(renderingEngineId)
  const viewportId = "CT_AXIAL_STACK"

  useEffect(() => {
    test(firstRef.current)
  }, [])

  async function test(element: any) {
    await initDemo()

    const viewportInput = {
      viewportId,
      element,
      type: ViewportType.STACK,
    }
    renderingEngine.enableElement(viewportInput)
    const viewport = renderingEngine.getViewport(viewportId)
    viewport.setStack(imageIds, 60)
    viewport.render()
  }

  return (
    <div className="cornerstone">
      <div ref={firstRef} style={{ width: "512px", height: "512px" }}></div>
    </div>
  )
}

export default CornerstoneNew
