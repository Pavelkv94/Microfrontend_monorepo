import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import firstImg from "@/assets/1.png";
import SecondImg from "@/assets/2.svg";
var App = function () {
    var _a = useState(0), count = _a[0], setCount = _a[1];
    //todo все что не попадает под условие переменной при сборке, не будет включено в сборку
    // if(__PLATFORM__ === 'desktop') {
    //   return <div>IS DESKTOP</div>
    // }
    if (__PLATFORM__ === 'mobile') {
        return _jsx("div", { children: "IS MOBILE" });
    }
    //todo ====end====
    useEffect(function () {
        setCount("");
    }, []);
    return (_jsxs("div", { children: ["Hello World", _jsxs("h2", { children: ["Platform: ", __PLATFORM__] }), _jsx(Link, { to: "/about", children: "about" }), _jsx(Link, { to: "/shop", children: "shop" }), _jsx("h1", { className: styles.red, children: count }), _jsx("button", { onClick: function () { return setCount(count + 1); }, children: "+" }), _jsx(Outlet, {}), _jsx("img", { src: firstImg, width: 100 }), _jsx(SecondImg, {})] }));
};
export default App;
