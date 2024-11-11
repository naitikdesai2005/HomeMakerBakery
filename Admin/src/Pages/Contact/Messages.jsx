import React,{ useState } from 'react'
import Sidebar  from '../Sidebar/Sidebar'

const Messages = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <div>
        <Sidebar visible={isSidebarVisible} />
      hello
    </div>
  )
}

export default Messages
