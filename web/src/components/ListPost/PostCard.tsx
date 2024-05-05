import { Box, Typography, Button } from "@mui/material";
import { RemovePost } from "../../repositories/UserRepository";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LoadingCircle from "../LoadingCircle";

export interface IPostCard {
  uid: string;
  Author: string;
  Title: string;
  Description: string;
  ImageUrl: string;
}
const PostCard = ({ uid, Title, Description, Author, ImageUrl }: IPostCard) => {
  const [isLoading, setIsLoading] = useState(false);
  const { refreshPosts } = useAuth();
  const onDelete = () => {
    setIsLoading(true);
    RemovePost(uid)
      .then((result) => {
        if (result) refreshPosts();
      })
      .finally(() => setIsLoading(false));
  };
  if (isLoading) return <LoadingCircle height="200px" />;
  return (
    <Box
      key={uid}
      sx={{
        m: "5px",
        backgroundColor: "#f5f5f5",
        borderRadius: 4,
        marginBottom: "15px",
      }}
    >
      <img style={{ width: "100%" }} src={ImageUrl} alt="image" />
      <Box sx={{ padding: "10px" }}>
        <Typography variant="h6">{Title}</Typography>
        <Typography variant="body1">{Description}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption">{Author}</Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
