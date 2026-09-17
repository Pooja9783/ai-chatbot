import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../src/components/Login";
import Register from "../src/components/Register";
import Chat from "../src/components/Chat";
import ProtectedRoute from "../src/components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

export default function App() {
    const { user, loading } = useAuth();

    console.log("APP USER:", user);
    console.log("APP LOADING:", loading);

    if (loading) {
        return null;
    }

    return (
        <Routes>

            <Route
                path="/"
                element={
                    <Navigate
                        to={user ? "/chat" : "/login"}
                        replace
                    />
                }
            />

            <Route
                path="/login"
                element={
                    user
                        ? <Navigate to="/chat" replace />
                        : <Login />
                }
            />

            <Route
                path="/register"
                element={
                    user
                        ? <Navigate to="/chat" replace />
                        : <Register />
                }
            />

            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}