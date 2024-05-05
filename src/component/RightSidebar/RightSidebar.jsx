import React from 'react'
import './RightSidebar.css'
import Widget from './Widget'
import WindgetTags from './WidgetTags'


const RightSidebar = () => {
  return (
   <aside className='right-sidebar'>
<Widget />
<WindgetTags />
   </aside>
  )
}

export default RightSidebar
