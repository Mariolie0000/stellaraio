import React from 'react'

function NewFaqArrowDown({active}) {
  const Rotate = {
    transform: "rotate(180deg)",
    transformOrigin: "center"
  }
  return (
    <svg style={active ? Rotate:{}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M6 10L12 16L18 10" stroke="#666D85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}

export default NewFaqArrowDown