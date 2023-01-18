import { AppPaths } from "../constants/commonEnums";
import { useAppContext } from "ContextAPIs/appContext";
import { Navigate } from "react-router-dom";
import { getUserID, getUserToken } from "utils/localStorage";
import { getProtectedRoutes } from "utils/FeatureCheck";

interface IProtectedTour {
  component: JSX.Element;
  route: string;
}

function ProtectedRoute(props: IProtectedTour) {
  const token = getUserToken();
  const userId = getUserID();
  const { user } = useAppContext();

  const { component, route } = props;

  //@ts-ignore
  const routeAccessible = getProtectedRoutes(route);

  const isAuthenticated = Boolean(token && userId);

  return isAuthenticated ? (
    routeAccessible ? (
      component
    ) : (
      <Navigate to={`/${AppPaths.DASHBOARD}`} />
    )
  ) : (
    <Navigate to={`${AppPaths.LOGIN}`} />
  );
}

export default ProtectedRoute;
