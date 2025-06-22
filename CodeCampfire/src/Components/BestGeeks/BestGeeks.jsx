import React, { useEffect, useState } from "react";

export default function Geeks() {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchStats = async (usersList) => {
    try {
      const statsPromises = usersList.map(async (user) => {
        const projectsRes = await fetch(`http://localhost:8080/getUserProjects/${user.id}`);
        const challengesRes = await fetch(`http://localhost:8080/getUserChallenges/${user.id}`);

        const projects = await projectsRes.json();
        const challenges = await challengesRes.json();

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          photo: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90) + 1}.jpg`,
          projectCount: projects.length,
          challengeCount: challenges.length,
          totalActivity: projects.length + challenges.length,
        };
      });

      const stats = await Promise.all(statsPromises);
      const top5 = stats
        .filter((s) => s.totalActivity > 0)
        .sort((a, b) => b.totalActivity - a.totalActivity)
        .slice(0, 5);

      setUserStats(top5);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchStats(users);
    }
  }, [users]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🏆 Top 5 Geeks</h2>
      <div className="space-y-6">
        {userStats.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.photo}
                alt={user.username}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm">
                <span className="font-medium text-indigo-600">{user.projectCount}</span> Projects
              </p>
              <p className="text-sm">
                <span className="font-medium text-purple-600">{user.challengeCount}</span> Challenges
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Total: {user.totalActivity} activities
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
