import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import UserCard from "@packages/shared/src/components/UserCard"

const App = () => {

    const [count, setCount] = useState(0)

    //todo все что не попадает под условие переменной при сборке, не будет включено в сборку
    // if(__PLATFORM__ === 'desktop') {
    //   return <div>IS DESKTOP</div>
    // }

    if(__PLATFORM__ === 'mobile') {
      return <div>IS MOBILE</div>
    }
    //todo ====end====

    

  return (
    <div>
      Hello World
      <h2>Platform: {__PLATFORM__}</h2>
      <h1>ADMIN MODULE</h1>
      <UserCard user="John Doe" />

      <Outlet />
    </div>
  )
}

export default App
