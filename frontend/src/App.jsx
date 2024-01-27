import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Document from "./pages/document";
import { useAuth } from "./context/Usercontext";

function App() {

 


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/signin" element = {<SignIn/>} errorElement = {<Error/>}/>
        <Route path="/signup" element = {<Signup/>} errorElement = {<Error/>}/>
        <Route path="/document/:id" element = {<Document/>} errorElement = {<Error/>}/>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router = {router}/>
    </>
  );
}
const Root = () => {

  con

  return (
    <>
      <div className="flex flex-col min-h-screen">
         <Navbar/>
        <Outlet/>
      </div>
    </>
  );
};
export default App;
