import React, { useEffect, useState } from "react";
import { Formiz, useForm } from "@formiz/core";
import Input from "../form/Input";
import { Box } from "@mui/material";
import "./styles.css";
import { SignIn } from "../../utils/Auth";
import LoadingCircle from "../LoadingCircle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Validators from "../form/Validators";

type FormValues = {
  Email: string;
  Password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidCredential, setIsInvalidCredential] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    if (user.isAdmin()) navigate("/dashboard");
    else setIsInvalidCredential(true);
  }, [user, navigate]);

  const form = useForm<FormValues>({
    onValidSubmit: (values) => {
      setIsLoading(true);
      SignIn(values.Email, values.Password)
        .catch(() => setIsInvalidCredential(true))
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <Box className="login-container">
      {isLoading && <LoadingCircle />}
      {!isLoading && (
        <Formiz connect={form} autoForm>
          {isInvalidCredential && (
            <span className="form-error-feedback">Invalid Credential</span>
          )}
          <Input
            required
            name="Email"
            label="Email"
            validations={[Validators.email]}
          />
          <Input name="Password" label="Password" type="password" required />
          <button
            className={`action-button ${!form.isValid && "disabled"}`}
            type="submit"
          >
            Sign In
          </button>
        </Formiz>
      )}
    </Box>
  );
};

export default LoginPage;
