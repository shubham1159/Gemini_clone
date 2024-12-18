import React from 'react'
import './Sidebar.css'
import { useState } from 'react'

const Sidebar = () => {
  const [extended,setExtended] = useState(false)
  return (
    <div className='sidebar'>
      <div id="top" onClick={()=>setExtended(prev=>!prev)}>
      <i class="fa-solid fa-bars"></i>
      </div>
      <div id="newchat">
      <i class="fa-solid fa-plus"></i>{extended?<p>New Chat</p>:null}
      </div>
      
      <div className="bottom">
        <div className="gem">
        <i class="fa-regular fa-gem"></i>{extended?<p>Gem Manager</p>:null}
        </div>
        <div className="help">
        <i class="fa-regular fa-circle-question"></i>{extended?<p>Help</p>:null}
        </div>
        <div className="activity">
        <i class="fa-solid fa-clock-rotate-left"></i>{extended?<p>Activity</p>:null} 
        </div>
        <div className="setting">
        <i class="fa-solid fa-gear"></i>{extended?<p>Setting</p>:null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
