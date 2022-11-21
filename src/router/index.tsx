import { AppPaths, SubPaths } from "../constants/commonEnums";
import Login from "components/Login";
import Users from "components/Users";
import Dashboard from "components/Dashboard";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import AddUser from "components/Users/AddUser";
import ErrorBoundary from "components/commonComponent/ErrorBoundry";
import { UserDetails } from "components/Users/UserDetails";
import EditProfile from "components/UserProfile";
import Organization from 'components/Organization';
import {OrganizationDetails} from "components/Organization/OrganizationDetails";
import AddDevice from "components/Devices/AddDevice";
import Devices from "components/Devices";
import { DeviceDetails } from "components/Devices/DeviceDetails";
import Driver from '../components/Drivers/index';
import AddDriver from "components/Drivers/AddDriver";
import Vehicles from "components/Vehicles";
import AddVehicle from "components/Vehicles/AddVehicle";
import {VehicleDetails} from "components/Vehicles/VehicleDetails"

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path={AppPaths.LOGIN}
        element={
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        }
      />
     
    
      
      <Route
        path={AppPaths.DASHBOARD}
        element={
          <ProtectedRoute
            route={AppPaths.DASHBOARD}
            component={
              <>
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              </>
            }
          />
        }
      />
      
      
      <Route
        path={AppPaths.USERS}
        element={
          <ProtectedRoute
            route={AppPaths.USERS}
            component={
              <>
                <ErrorBoundary>
                  <Users />
                </ErrorBoundary>
              </>
            }
          />
        }
      />
      <Route
        path={`${AppPaths.USERS}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.USERS}
            component={
              <ErrorBoundary>
                <UserDetails />
              </ErrorBoundary>
            }
          />
        }
      />
      <Route
        path={`${AppPaths.USERS}/${SubPaths.ADD}`}
        element={
          <ProtectedRoute
            route={AppPaths.USERS}
            component={<AddUser />}
          />
        }
      />
      <Route
        path={`${AppPaths.USERS}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.USERS}
            component={<AddUser />}
          />
        }
      />
      <Route
        path={`${AppPaths.PROFILE}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.PROFILE}
            component={<EditProfile />}
          />
        }
      />
       <Route
        path={AppPaths.ORGANIZATIONS}
        element={
          <ProtectedRoute
            route={AppPaths.ORGANIZATIONS}
            component={
              <>
                <ErrorBoundary>
                  <Organization />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

    <Route
        path={`${AppPaths.ORGANIZATIONS}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.ORGANIZATIONS}
            component={
              <ErrorBoundary>
                <OrganizationDetails />
              </ErrorBoundary>
            }
          />
        }
      />

       <Route
        path={AppPaths.DEVICES}
        element={
          <ProtectedRoute
            route={AppPaths.DEVICES}
            component={
              <>
                <ErrorBoundary>
                  <Devices />
                </ErrorBoundary>
              </>
            }
          />
        }
      />
      <Route
        path={`${AppPaths.DEVICES}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.DEVICES}
            component={
              <ErrorBoundary>
                <DeviceDetails />
              </ErrorBoundary>
            }
          />
        }
      />
      <Route
        path={`${AppPaths.DEVICES}/${SubPaths.ADD}`}
        element={
          <ProtectedRoute
            route={AppPaths.DEVICES}
            component={<AddDevice />}
          />
        }
      />
      <Route
        path={`${AppPaths.DEVICES}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.DEVICES}
            component={<AddDevice />}
          />
        }
      />

    <Route
        path={AppPaths.DRIVERS}
        element={
          <ProtectedRoute
            route={AppPaths.DRIVERS}
            component={
              <>
                <ErrorBoundary>
                  <Driver />
                </ErrorBoundary>
              </>
            }
          />
        }
      />
      <Route
        path={`${AppPaths.DRIVERS}/${SubPaths.ADD}`}
        element={
          <ProtectedRoute
            route={AppPaths.DRIVERS}
            component={<AddDriver />}
          />
        }
      />
     
     <Route
        path={`${AppPaths.DRIVERS}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.DRIVERS}
            component={<AddDriver />}
          />
        }
      />

<Route
        path={AppPaths.VEHICLES}
        element={
          <ProtectedRoute
            route={AppPaths.VEHICLES}
            component={
              <>
                <ErrorBoundary>
                  <Vehicles />
                </ErrorBoundary>
              </>
            }
          />
        }
      />
      <Route
        path={`${AppPaths.VEHICLES}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.VEHICLES}
            component={
              <ErrorBoundary>
                <VehicleDetails />
              </ErrorBoundary>
            }
          />
        }
      />
      <Route
        path={`${AppPaths.VEHICLES}/${SubPaths.ADD}`}
        element={
          <ProtectedRoute
            route={AppPaths.VEHICLES}
            component={<AddVehicle />}
          />
        }
      />
      <Route
        path={`${AppPaths.VEHICLES}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.VEHICLES}
            component={<AddVehicle />}
          />
        }
      />


      <Route
        path={"*"}
        element={
          <ProtectedRoute
            route={AppPaths.DASHBOARD}
            component={
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            }
          />
        }
      />
    </Routes>
  );
}
