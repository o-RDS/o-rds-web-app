import react, { useEffect, useRef } from "react";
import { Outlet } from "react-router";

export default function ConfigContext(props: any) {
  const AdminAuthContext = react.createContext({});

  return <Outlet />;
}
