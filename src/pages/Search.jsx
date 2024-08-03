import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchSearch } from "../libs/fetcher";
import {
  Alert,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import FollowButton from "../components/FollowButton";

export default function Search() {

    const navigate = useNavigate();


  const [query, setQuery] = useState("");

  const debounceQuery = useDebounce(query, 500);

  const { isLoading, isError, error, data } = useQuery(
    ["search", debounceQuery],
    () => {
      return fetchSearch(debounceQuery);
    }
  );

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <TextField
        fullWidth={true}
        variant="outlined"
        placeholder="search user"
        onKeyUp={(e) => {
          setQuery(e.target.value);
        }}
      />

      {isLoading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>Loading...</Box>
      ) : (
        <List>
          {data.map((user) => {
            return (
              <ListItem  
              key={user.id}>
                <ListItemButton
                  onClick={() => {
                    navigate(`/profile/${user.id}`);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>

                  <ListItemText primary={user.name} secondary={user.bio} />

                  <ListItemSecondaryAction>
                    <FollowButton user={user} />
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
