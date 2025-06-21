import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './Components/MainPage/MainPage';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import LoginForm from './Components/LoginForm/LoginForm';
import ProjectCard from './Components/ProjectCard/ProjectCard';
import SideBar from './Components/SideBar'
import PostsPage from './Components/PostsPage/PostsPage';
// import Sidebar if needed

export default function App() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
    if (storedUserId) {
      navigate("/")
    }
  }, [userId]);

  return (
    <>
      {userId && <SideBar />}
      <Routes>
        {!userId ? (
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/*" element={<MainPage />} />
          </>
        ) : (
          <>
            <Route path="/postsPage" element={<PostsPage />} />
            <Route path="/*" element={<PostsPage />} />
          </>
        )}
      </Routes>
    </>
  );
}