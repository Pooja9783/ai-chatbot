import { useAuth } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import MainChat from "./components/MainChat";

export default function App() {
  const { user, loading } = useAuth();


  if (loading) {
    return null;
  }

  return user ? <MainChat /> : <AuthModal />;
}