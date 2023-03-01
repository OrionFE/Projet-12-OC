import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="profile">
            <Route path=":userId" element={<Profile />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
