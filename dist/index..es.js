import e,{createContext as o,useState as t,useContext as r}from"react";const n=require("js-cookie"),s=o({});s.displayName="AuthContext";const i=({children:o})=>{const[r,i]=t(n.get("token"));return e.createElement(s.Provider,{value:{token:r,login:async(e,o)=>{console.log("Should hit the server with username and password",e,o);const t="fakeToken";n.set("token",t),i(t)},logout:()=>{console.log("Will logout"),n.remove("token"),i(void 0)}}},o)},l=()=>{const e=r(s);if(!e)throw new Error("useAuthContext must be used within AuthProvider");return e};export{i as AuthProvider,l as useAuthContext};