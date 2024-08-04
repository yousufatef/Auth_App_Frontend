import { useState } from "react";
import styles from "../../styles/Form.module.css";
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [userInputs, setUserInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [register, { isError, error, isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({
        first_name: userInputs.first_name,
        last_name: userInputs.last_name,
        email: userInputs.email,
        password: userInputs.password,
      });

      const accessToken = data.accessToken;
      if (data && accessToken) {
        Cookies.set("accessToken", accessToken);
        setUserInputs({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } else {
        console.error("No access token received");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text" // Corrected here
            name="first_name"
            required
            value={userInputs.first_name}
            onChange={(e) =>
              setUserInputs((prev) => ({ ...prev, first_name: e.target.value }))
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text" // Corrected here
            name="last_name"
            required
            value={userInputs.last_name}
            onChange={(e) =>
              setUserInputs((prev) => ({ ...prev, last_name: e.target.value }))
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={userInputs.email}
            onChange={(e) =>
              setUserInputs((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
            value={userInputs.password}
            onChange={(e) =>
              setUserInputs((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </fieldset>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Create Account"}
        </button>
      </form>
      {isError && error && (
        <h1 className={styles.error}>{error.data.message}</h1>
      )}
    </>
  );
};

export default SignupForm;
