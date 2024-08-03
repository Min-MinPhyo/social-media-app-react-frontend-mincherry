import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useApp } from "../ThemedApp";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postUser } from "../libs/fetcher";
export default function Register() {
  const { setGlobalMsg } = useApp();
  const nameInput = useRef();
  const usernameInput = useRef();
  const bioInput = useRef();
  const passwordInput = useRef();

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const name = nameInput.current.value;
    const username = usernameInput.current.value;
    const bio = bioInput.current.value;
    const password = passwordInput.current.value;

    if (!name || !username || !password) {
      setError("name , username ,password fields required...");
      return false;
    }
    create.mutate({ name, username, bio, password });
  };

  const create = useMutation(async data => postUser(data), {
    onError: async () => {
    setError("Cannot create account");
    },
    onSuccess: async user => {
    setGlobalMsg("Account Created");
    navigate("/login");
    },
    });


  return (
    <Box>
      <Typography variant="h3">Register</Typography>

      {
        error && (
          <Alert severity="warning" sx={{ mt: 2 }}>
        Please enter all fields
      </Alert>

        )
      }
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
          <TextField inputRef={nameInput} placeholder="name" fullWidth />

          <TextField
            inputRef={usernameInput}
            placeholder="username"
            fullWidth
          />
          <TextField inputRef={bioInput} placeholder="bio" fullWidth />
          <TextField
            inputRef={passwordInput}
            type="password"
            placeholder="enter passowrd"
            fullWidth
          />
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}
