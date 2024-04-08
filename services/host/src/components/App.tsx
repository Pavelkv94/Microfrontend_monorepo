import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { shopRoutes } from "@packages/shared/src/routes/shop"; //todo имеем доступ к переменным из shared и можем переиспользовать
import { aboutRoutes } from "@packages/shared/src/routes/admin"; //todo имеем доступ к переменным из shared и можем переиспользовать

const App = () => {
  const [count, setCount] = useState(0);

  //todo все что не попадает под условие переменной при сборке, не будет включено в сборку
  // if(__PLATFORM__ === 'desktop') {
  //   return <div>IS DESKTOP</div>
  // }

  if (__PLATFORM__ === "mobile") {
    return <div>IS MOBILE</div>;
  }
  //todo ====end====

  return (
    <div>
      Hello World
      <h2>Platform: {__PLATFORM__}</h2>
      <Link to={aboutRoutes.about}>about</Link>
      <Link to={shopRoutes.main}>shop</Link>
      <Outlet />
    </div>
  );
};

export default App;
