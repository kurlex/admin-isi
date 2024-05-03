import { Box } from "@mui/material";
import AddPost from "../addPost";
import "./styles.css";
import AddCategory from "../addCategory";

const DashboardPage = () => {
  return (
    <Box className="dashboard">
      <Box className="left-dashboard">
        <AddPost />
      </Box>
      <Box className="right-dashboard">
        <AddCategory />
      </Box>
    </Box>
  );
};

export default DashboardPage;
