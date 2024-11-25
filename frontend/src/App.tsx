import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Modal from "./components/modals/Modal";
import Navbar from "./components/Navbar";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Properties from "./pages/Properties";
import Triplist from "./pages/Triplist";
import WishList from "./pages/WishList";

// NOTE:IF YOU WANT TO QUERY ON SAME PAGE USE ELEMENT SAME ON BOTH ROUTE.
//  <Route
// path="/properties"
// element={
//   <ProtectedRoute>
//     <Properties />
//   </ProtectedRoute>
// }
// ></Route>
// <Route path="/" element={<Homepage />}></Route>
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto">
        <Modal />
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path="/triplist"
            element={
              <ProtectedRoute>
                <Triplist />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <Properties />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/view/:id" element={<ListingDetails />}></Route>
          <Route
            path="/create-listing"
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
