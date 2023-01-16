import Main from "./Main"
import "./index.css"
import { useRef, useState } from "react"

export default function Index() {
  const [layout, setLayout] = useState([1, 1])
  const selectRef = useRef(null)

  function changeLayout(e: any) {
    switch (e.target.value) {
      case "1":
      default:
        setLayout([1, 1])
        break
      case "2":
        setLayout([1, 2])
        break
      case "3":
        setLayout([1, 3])
        break
      case "4":
        setLayout([2, 2])
        break
    }
  }

  return (
    <div style={{userSelect: 'none'}}>
      <select ref={selectRef} onChange={changeLayout}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <div style={{ display: "flex" }}>
        <div style={{ border: "1px solid red", width: 50, height: 50 }}>A</div>
        <div style={{ border: "1px solid red", width: 50, height: 50 }}>B</div>
        <div style={{ border: "1px solid red", width: 50, height: 50 }}>C</div>
        <div style={{ border: "1px solid red", width: 50, height: 50 }}>D</div>
      </div>
      <Main layout={layout} />
    </div>
  )
}
