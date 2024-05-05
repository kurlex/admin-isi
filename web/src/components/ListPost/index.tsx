import { Box } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import PostCard from "./PostCard";

const ListPost = () => {
  const { user } = useAuth();
  return (
    <Box sx={{ overflowY: "scroll", height: "80vh" }}>
      {user?.posts.map((post) => (
        <PostCard {...post} />
      ))}
    </Box>
  );
};

export default ListPost;
