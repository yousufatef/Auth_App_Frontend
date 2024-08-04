import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../redux/features/users/userApiSlice";
import Cookies from "js-cookie";
import "./Dashboard.css";
import { useLogoutMutation } from "../../redux/features/auth/authApiSlice";

const Dashboard = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUsersQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const formatDate = (isoDateString, format = "YYYY-MM-DD") => {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return format.replace("YYYY", year).replace("MM", month).replace("DD", day);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Ensure logout is awaited
      navigate("/auth/login");
      Cookies.remove("accessToken");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError)
    return <p>Error: {error?.data?.message || "An error occurred"}</p>;

  return (
    <div className="table-container">
      <button className="logout" type="button" onClick={handleLogout}>
        Log Out
      </button>
      <h1>Dashboard</h1>
      {isSuccess && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Dashboard;
