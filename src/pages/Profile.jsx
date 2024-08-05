import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { fetchUser } from "../libs/fetcher";
import { useQuery } from "react-query";
import FollowButton from "../components/FollowButton";

export default function Profile() {
  const { id } = useParams();

  const { isLoading, isError, error, data } = useQuery(`users/${id}`, async () => fetchUser(id));

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

  // Providing default values if `data` is undefined
  const posts = data?.posts || [];
  const comments = data?.comments || [];

  return (
    <Box>
      <Box sx={{ bgcolor: "banner", height: 150, borderRadius: 4 }}></Box>
      <Box
        sx={{
          mb: 4,
          marginTop: "-60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 50, color: "text.fade" }}>
            {data.name}
          </Typography>
          <Typography sx={{ fontSize: 30, color: "text.fade" }}>
            {data.bio}
          </Typography>

          <Typography sx={{ alignItem: "center", justifyContent: "center", mt: 3 }}>
            <FollowButton user={data} />
          </Typography>

          <Divider sx={{ marginTop: 5 }} />

          {/* Posts Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Posts
            </Typography>

            {posts.length > 0 ? (
              posts.map((post) => (
                <Card
                  key={post.id}
                  sx={{
                    mb: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "green" }}>
                      {post.created}
                    </Typography>
                    <Typography sx={{ fontSize: "30px", color: "green" }}>{post.content}</Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={{ color: "red", fontSize: 20 }}>No posts available</Typography>
            )}
          </Box>

          {/* Comments Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Comments
            </Typography>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Card
                  key={comment.id}
                  sx={{
                    mb: 2,
                    bgcolor: "#f5f5f5",
                    borderRadius: 2,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "green" }}>
                      {comment.created}
                    </Typography>
                    <Typography sx={{ fontSize: "30px", color: "green" }}>{comment.content}</Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={{ color: "red", fontSize: 20 }}>No comments available</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
