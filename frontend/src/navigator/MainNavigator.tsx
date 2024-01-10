import { Suspense, lazy, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { FadeIn } from "../animations/PageTransition";
import LoadingPage from "../pages/Loading/LoadingPage";
import UserDataContextTypes from "../types/UserDataContextTypes";
import UserDataContext from "../context/UserDataContext";
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ClientStats = lazy(() => import("../pages/ClientStats/ClientStats"));
const FreelancerStats = lazy(
  () => import("../pages/FreelancerStats/FreelancerStats")
);
const AdminStats = lazy(() => import("../pages/AdminStats/AdminStats"));
const AllProjects = lazy(() => import("../pages/AllProjects/AllProjects"));
const AllClientProjects = lazy(
  () => import("../pages/AllClientProjects/AllClientProjects")
);
const AllFreelancers = lazy(
  () => import("../pages/AllFreelancers/AllFreelancers")
);
const PaymentPage = lazy(() => import("../pages/PaymentPage/PaymentPage"));
const CompletedProjects = lazy(
  () => import("../pages/CompletedProjects/CompletedProjects")
);
const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const Index = lazy(() => import("../pages/Index"));


function MainNavigator() {
  const location = useLocation();

  const { userData }: UserDataContextTypes = useContext(UserDataContext);

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="*"
        element={
          <FadeIn>
            <Suspense fallback={<LoadingPage />}>
              <NotFound />
            </Suspense>
          </FadeIn>
        }
      />
      <Route
        path="/"
        element={
          <FadeIn duration={2.5} delay={0.5}>
            <Suspense fallback={<LoadingPage />}>
              <Index />
            </Suspense>
          </FadeIn>
        }
      />
      <Route
        path="/login"
        element={
          <FadeIn>
            <Suspense fallback={<LoadingPage />}>
              <Login />
            </Suspense>
          </FadeIn>
        }
      />
      <Route
        path="/signup"
        element={
          <FadeIn>
            <Suspense fallback={<LoadingPage />}>
              <Signup />
            </Suspense>
          </FadeIn>
        }
      />
      {userData?.role === "client" && (
        <Route path="/client" element={<Dashboard />}>
          <Route
            index
            element={
              <FadeIn duration={0.5}>
                <Suspense fallback={<LoadingPage />}>
                  <ClientStats />
                </Suspense>
              </FadeIn>
            }
          />
          <Route
            path="your-projects"
            element={
              <FadeIn>
                <Suspense fallback={<LoadingPage />}>
                  <AllClientProjects />
                </Suspense>
              </FadeIn>
            }
          />
          <Route
            path="payment"
            element={
              <FadeIn>
                <Suspense fallback={<LoadingPage />}>
                  <PaymentPage />
                </Suspense>
              </FadeIn>
            }
          />
        </Route>
      )}
      {userData?.role === "freelancer" && (
        <Route path="/freelancer" element={<Dashboard />}>
          <Route
            index
            element={
              <FadeIn>
                <Suspense fallback={<LoadingPage />}>
                  <FreelancerStats />
                </Suspense>
              </FadeIn>
            }
          />
          <Route
            path="all-projects"
            element={
              <FadeIn>
                <Suspense fallback={<LoadingPage />}>
                  <AllProjects />
                </Suspense>
              </FadeIn>
            }
          />
          <Route
            path="completed-projects"
            element={
              <FadeIn>
                <Suspense fallback={<LoadingPage />}>
                  <CompletedProjects />
                </Suspense>
              </FadeIn>
            }
          />
        </Route>
      )}
      {userData?.role === "admin" && (
        <Route path="/admin" element={<Dashboard />}>
          <Route
            index
            element={
              <FadeIn>
                <Suspense fallback={<LoadingPage />}>
                  <AdminStats />
                </Suspense>
              </FadeIn>
            }
          />
          <Route
            path="all-freelancers"
            element={
              <FadeIn>
                <Suspense fallback={<LoadingPage />}>
                  <AllFreelancers />
                </Suspense>
              </FadeIn>
            }
          />
          <Route
            path="all-projects"
            element={
              <FadeIn>
                <Suspense fallback={<LoadingPage />}>
                  <AllProjects />
                </Suspense>
              </FadeIn>
            }
          />
        </Route>
      )}
    </Routes>
  );
}

export default MainNavigator;
