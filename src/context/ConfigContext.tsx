import { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router";
import { retrieveSurveyConfig } from "../APIs/Firebase";

export default function ConfigContext(props: any) {
  //const SurveyConfigContext = react.createContext({});
  const navigate = useNavigate();
  const params = useParams();
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    if (params.id && typeof params.id === "string") {
      console.log(params.id);
      retrieveSurveyConfig(params.id).then((data) => {
        if (data == null) {
          navigate("/invalid");
        } else {
          if (!data.live) {
            navigate("/invalid");
          }
          setConfig(data);
          if (params.id && typeof params.id === "string") {
            window.sessionStorage.setItem(params.id, JSON.stringify(data));
          }
        }
      });
    } else {
      navigate("/invalid");
    }
  }, [navigate, params.id]);

  return <Outlet context={config} />;
}
