import Board from "./pages/BoardPage";
import Homepage from "./pages/Homepage";
const AppRoutes = [
    {
        index: true,
        element: <Homepage/>
    },
    {
      path: '/board/:id',
      element: <Board />
    },
  ];
  
  export default AppRoutes;