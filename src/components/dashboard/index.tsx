import { Box } from "@mui/material";
import AddPost from "../addPost";
import "./styles.css";
import AddCategory from "../addCategory";
import RemoveCategory from "../removeCategory";
import ListPost from "../ListPost";

const DashboardPage = () => {
  return (
    <Box className="dashboard">
      <Box className="left-dashboard">
        <AddPost />
      </Box>
      <Box className="right-dashboard">
        <ListPost />
      </Box>
      <Box
        className="right-dashboard"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "rgb(238, 238, 238)",
            marginBottom: "5px",
          }}
        >
          <AddCategory />
        </Box>
        <Box
          sx={{
            marginTop: "5px",
            backgroundColor: "rgb(238, 238, 238)",
            display: "grid",
            placeItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <RemoveCategory />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
