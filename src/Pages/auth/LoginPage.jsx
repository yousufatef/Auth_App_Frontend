import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
