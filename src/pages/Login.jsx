import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { postLogin } from "../libs/fetcher";

export default function Login() {
  const { setAuth } = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const usernameInput = useRef();
  const passwordInput = useRef();
  const handleSubmit= () => {
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;

    if (!username || !password) {
      setError("please enter username and password");
      return false;
    }

    login.mutate({ username, password });
  };
  const login = useMutation(
    async ({ username, password }) => postLogin(username, password),
    {
    onError: async () => {
    setError("Incorrect username or password");
    },
    onSuccess: async result => {
    setAuth(result.user);
    localStorage.setItem("token", result.token);
    navigate("/");
    },
    }
    );

  return (
    <Box>
      <Typography variant="h3">Login</Typography>

      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          All fields are required
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            placeholder="username"
            inputRef={usernameInput}
            fullWidth
          />
          <TextField
            type="password"
            placeholder="enter password"
            inputRef={passwordInput}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
