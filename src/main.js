import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/header";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const List = React.lazy(() => import("components/list"));
const Login = React.lazy(() => import("components/login"));
const Cart = React.lazy(() => import("components/Cart"));
const useStyles = makeStyles({
  root: {
    textAlign: "center",
    height: "100%",
  },
});
function Main() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/login"}
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path={"/dashbord"}
            element={
              <React.Suspense fallback={<>...</>}>
                <List />
              </React.Suspense>
            }
          />
          <Route
            path={"/"}
            element={
              <React.Suspense fallback={<>...</>}>
                <List />
              </React.Suspense>
            }
          />
          <Route
            path={"/cart"}
            element={
              <React.Suspense fallback={<>...</>}>
                <Cart />
              </React.Suspense>
            }
          />
           <Route path="*" element={<h1>404 Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default Main;
