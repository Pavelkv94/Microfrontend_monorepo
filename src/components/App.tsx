import React, { useEffect, useState } from 'react'
import styles from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import firstImg from "@/assets/1.png";
import SecondImg from "@/assets/2.svg";

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
      <Link to={"/about"}>about</Link>
      <Link to={"/shop"}>shop</Link>

      <h1 className={styles.red}>{count}</h1>
      <button onClick={() => setCount(count+1)}>+</button>
      <Outlet />
      <img src={firstImg} width={100}/>
      <SecondImg />
    </div>
  )
}

export default App
