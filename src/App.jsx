import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoginProtected from "./routes/LoginProtect";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });



  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
          <Route path="/login" element={<LoginProtected><LoginPage /></LoginProtected>} />
          <Route path="/signup" element={<LoginProtected><SignupPage /></LoginProtected>} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
