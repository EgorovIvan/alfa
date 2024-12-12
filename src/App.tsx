import {FC} from "react";
import './App.scss'
import './assets/styles/reset.scss'
import './assets/fonts/StudioScript.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.tsx";

const App: FC = () => {
    return <RouterProvider router={router} />;
};
      // <Router>
      //     <Routes>
      //         <Route path="/" element={<Home />} />
      //         <Route path="/catalog" element={<Catalog/>} />
      //         <Route path="/about" element={<div>О нас</div>} />
      //         <Route path="/contacts" element={<div>Контакты</div>} />
      //     </Routes>
      // </Router>

export default App
