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
import Organization from "components/Organization";
import { OrganizationDetails } from "components/Organization/OrganizationDetails";
import AddDevice from "components/Devices/AddDevice";
import Devices from "components/Devices";
import { DeviceDetails } from "components/Devices/DeviceDetails";
import Driver from "../components/Drivers/index";
import AddDriver from "components/Drivers/AddDriver";
import Vehicles from "components/Vehicles";
import AddVehicle from "components/Vehicles/AddVehicle";
import { VehicleDetails } from "components/Vehicles/VehicleDetails";
import { DriverDetails } from "../components/Drivers/DriverDetails";
import LiveView from "components/LiveView";
import Alerts from "components/Alerts";
import { AlertDetails } from "components/Alerts/AlertDetails";
import AddAlert from "components/Alerts/AddAlert";
import MapView from "components/MapView";
import Trip from "components/Trip";
import TripIncident from "components/Trip/TripIncidentModal";

import GeofenceTrip from "components/GeofenceTrips"
import Report from "components/Report";
import Finance from "components/Finance";
import Fuel from "components/Fuel";
import Tyre from "components/Tyre";
import AddTyreClaim from "components/Tyre/AddDriver";
import { TyreClaimInfo } from "components/Tyre/DriverDetails";
import Maintenance from "components/Maintenance";
import Coaching from "components/Coaching";
import { TyrePerfomanceInfo } from "components/Coaching/DriverDetails";
import Configuration from "components/Tyre/Configuration";
import JobCard from "components/JobCard";
import GeoFence from "components/GeoFence";
import AddGeoFence from "components/GeoFence/AddGeoFence";
import { GeofenceDetails } from "components/GeoFence/GeofenceDetails";
import PrivacyPolicy from "components/PrivacyPolicy";
import TermsConditions from "components/TermsAndCondition";
import Inspection from "components/Inspection";
import DeviceLocks from "components/DeviceLocks";
import DeviceUnlockHistory from "components/DeviceUnlockHistory";
import { InspectionDetails } from "components/Inspection/InspectionDetails";

//todo: Need to be updated
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
        path={AppPaths.PRIVACY_POLICY}
        element={
          <ErrorBoundary>
            <PrivacyPolicy />
          </ErrorBoundary>
        }
      />

      <Route
        path={AppPaths.TERMS_CONDITIONS}
        element={
          <ErrorBoundary>
            <TermsConditions />
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
          <ProtectedRoute route={AppPaths.USERS} component={<AddUser />} />
        }
      />
      <Route
        path={`${AppPaths.USERS}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute route={AppPaths.USERS} component={<AddUser />} />
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
          <ProtectedRoute route={AppPaths.DEVICES} component={<AddDevice />} />
        }
      />
      <Route
        path={`${AppPaths.DEVICES}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute route={AppPaths.DEVICES} component={<AddDevice />} />
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
          <ProtectedRoute route={AppPaths.DRIVERS} component={<AddDriver />} />
        }
      />

      <Route
        path={`${AppPaths.DRIVERS}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute route={AppPaths.DRIVERS} component={<AddDriver />} />
        }
      />
      <Route
        path={`${AppPaths.DRIVERS}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.DRIVERS}
            component={
              <ErrorBoundary>
                <DriverDetails />
              </ErrorBoundary>
            }
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
        path={AppPaths.LIVE}
        element={
          <ProtectedRoute
            route={AppPaths.LIVE}
            component={
              <>
                <ErrorBoundary>
                  <LiveView />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={AppPaths.ALERTS}
        element={
          <ProtectedRoute
            route={AppPaths.ALERTS}
            component={
              <>
                <ErrorBoundary>
                  <Alerts />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={`${AppPaths.ALERTS}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.ALERTS}
            component={
              <ErrorBoundary>
                <AlertDetails />
              </ErrorBoundary>
            }
          />
        }
      />

      <Route
        path={`${AppPaths.ALERTS}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute route={AppPaths.ALERTS} component={<AddAlert />} />
        }
      />

      <Route
        path={AppPaths.MAP}
        element={
          <ProtectedRoute
            route={AppPaths.MAP}
            component={
              <>
                <ErrorBoundary>
                  <MapView />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={AppPaths.REPORT}
        element={
          <ProtectedRoute
            route={AppPaths.REPORT}
            component={
              <>
                <ErrorBoundary>
                  <Report />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={AppPaths.TRIP}
        element={
          <ProtectedRoute
            route={AppPaths.TRIP}
            component={
              <>
                <ErrorBoundary>
                  <Trip />
                </ErrorBoundary>
              </>
            }
          />
        }
      />
      {/* 
      <Route
        path={`${AppPaths.TRIP}/alert/:tripId`}
        element={
          <ProtectedRoute
            route={AppPaths.TRIP}
            component={
              <>
                <ErrorBoundary>
                  <TripIncident />
                </ErrorBoundary>
              </>
            }
          />
        }
      /> */}

      <Route
        path={AppPaths.GEOFENCETRIPS}
        element={
          <ProtectedRoute
            route={AppPaths.GEOFENCETRIPS}
            component={
              <>
                <ErrorBoundary>
                  <GeofenceTrip />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={AppPaths.FINANCE}
        element={
          <ProtectedRoute
            route={AppPaths.FINANCE}
            component={
              <>
                <ErrorBoundary>
                  <Finance />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={AppPaths.FUEL}
        element={
          <ProtectedRoute
            route={AppPaths.FUEL}
            component={
              <>
                <ErrorBoundary>
                  <Fuel />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={AppPaths.TYREPERFORMANCE}
        element={
          <ProtectedRoute
            route={AppPaths.TYREPERFORMANCE}
            component={
              <>
                <ErrorBoundary>
                  <Coaching />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={`${AppPaths.TYREPERFORMANCE}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.TYREPERFORMANCE}
            component={
              <ErrorBoundary>
                <TyrePerfomanceInfo />
              </ErrorBoundary>
            }
          />
        }
      />



      <Route
        path={AppPaths.MAINTENANCE}
        element={
          <ProtectedRoute
            route={AppPaths.MAINTENANCE}
            component={
              <>
                <ErrorBoundary>
                  <Maintenance />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={AppPaths.TYRE}
        element={
          <ProtectedRoute
            route={AppPaths.TYRE}
            component={
              <>
                <ErrorBoundary>
                  <Tyre />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={`${AppPaths.TYRE}/${SubPaths.ADD}`}
        element={
          <ProtectedRoute route={AppPaths.TYRE} component={<AddTyreClaim />} />
        }
      />
      <Route
        path={`${AppPaths.TYRE}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.TYRE}
            component={
              <ErrorBoundary>
                <TyreClaimInfo />
              </ErrorBoundary>
            }
          />
        }
      />
      <Route
          path={`${AppPaths.TYRE}/${SubPaths.CONFIGURATION}`}
          element={
            <ProtectedRoute
              route={AppPaths.TYRE}
              component={<Configuration />}
            />
          }
        />

      <Route
        path={AppPaths.JOBCARD}
        element={
          <ProtectedRoute
            route={AppPaths.JOBCARD}
            component={
              <>
                <ErrorBoundary>
                  <JobCard />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={AppPaths.GEOFENCE}
        element={
          <ProtectedRoute
            route={AppPaths.GEOFENCE}
            component={
              <>
                <ErrorBoundary>
                  <GeoFence />
                </ErrorBoundary>
              </>
            }
          />
        }
      />

      <Route
        path={`${AppPaths.GEOFENCE}/${SubPaths.ADD}`}
        element={
          <ProtectedRoute
            route={AppPaths.GEOFENCE}
            component={<AddGeoFence />}
          />
        }
      />
      <Route
        path={`${AppPaths.GEOFENCE}/${SubPaths.EDIT}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.GEOFENCE}
            component={<AddGeoFence />}
          />
        }
      />
      <Route
        path={`${AppPaths.GEOFENCE}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.GEOFENCE}
            component={
              <ErrorBoundary>
                <GeofenceDetails />
              </ErrorBoundary>
            }
          />
        }
      />

      <Route
        path={`${AppPaths.INSPECTION}`}
        element={
          <ProtectedRoute
            route={AppPaths.INSPECTION}
            component={
              <ErrorBoundary>
                <Inspection />
              </ErrorBoundary>
            }
          />
        }
      />

      <Route
        path={`${AppPaths.INSPECTION}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.INSPECTION}
            component={
              <ErrorBoundary>
                <InspectionDetails />
              </ErrorBoundary>
            }
          />
        }
      />

      <Route
        path={`${AppPaths.LOCKDEVICE}`}
        element={
          <ProtectedRoute
            route={AppPaths.LOCKDEVICE}
            component={
              <ErrorBoundary>
                <DeviceLocks />
              </ErrorBoundary>
            }
          />
        }
      />
      <Route
        path={`${AppPaths.LOCKDEVICE}/:id`}
        element={
          <ProtectedRoute
            route={AppPaths.LOCKDEVICE}
            component={
              <ErrorBoundary>
                <DeviceUnlockHistory />
              </ErrorBoundary>
            }
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
