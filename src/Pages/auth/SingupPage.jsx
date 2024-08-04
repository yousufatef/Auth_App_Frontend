import SingupForm from "../../components/auth/SignupForm";

const SingupPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "columns",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h2>SingUp</h2>
        <SingupForm />
      </div>
    </div>
  );
};

export default SingupPage;
