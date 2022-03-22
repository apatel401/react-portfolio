import React, {useEffect, useRef, useState} from 'react'

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import Splitting from 'splitting'

export default function Split({text, refRef}) {
  // eslint-disable-next-line no-unused-vars
  const [lines, setLines] = useState([])
  let splitTitle = "";

  useEffect(() => {
    if (refRef) {
      let split_res = Splitting({
        by: 'chars',
        whitespace: true
      });
      setLines(split_res[0].chars);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refRef])

  if (refRef) {
		splitTitle = (
// eslint-disable-next-line jsx-a11y/heading-has-content
<h2 className='splitting chars title text-center mt-5'>{text}</h2>
    )}
  return splitTitle;
}
