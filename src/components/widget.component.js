import React, { useState } from "react"

export const Widget =  () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{ `Count: ${count}` }</div>
      <button onClick={() => setCount(count+2)}>Increment</button>
    </div>
  )
}
export const Dingus =  () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{transform: `rotateZ(${count}deg)`}}>
      <div>{ `Count: ${count}` }</div>
      <button onClick={() => setCount(count+1)}>Increment</button>
    </div>
  )
}