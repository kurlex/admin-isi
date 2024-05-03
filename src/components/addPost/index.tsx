import { Formiz, useForm } from "@formiz/core";
import Select from "../form/Select";
import { useAuth } from "../../contexts/AuthContext";
import "./styles.css";
import Input from "../form/Input";
import Validators from "../form/Validators";
import InputImage from "../form/ImageInput";
import { Box } from "@mui/material";
import { UploadPost } from "../../repositories/UserRepository";
import LoadingCircle from "../LoadingCircle";
import { useState } from "react";
import IAddPost from "./IAddPost";

const AddPost = () => {
  const [state, setState] = useState(0);
  const { user, refreshPosts } = useAuth();
  const form = useForm<IAddPost>({
    onValidSubmit: (values) => {
      setState(1);
      UploadPost(user, values).then((result) => {
        setState(result ? 2 : 3);
        if (result) refreshPosts();
      });
    },
  });

  if (state === 1) return <LoadingCircle height="100vh" />;
  return (
    <Formiz connect={form} autoForm>
      {state === 2 && (
        <p className="form-error-feedback green text-center">Post added!</p>
      )}
      {state === 3 && (
        <p className="form-error-feedback text-center">
          Unable to added the post
        </p>
      )}
      <InputImage name="Image" required />
      <Select
        className="add-post-select"
        name="Category"
        label="Category"
        required
        itemsList={user!.categories}
      />
      <Input
        className="add-post-select"
        name="Title"
        label="Title"
        required
        validations={[Validators.alphabetic, Validators.maxLength(20)]}
      />
      <Input
        className="add-post-select add-post-textarea"
        name="Description"
        label="Description"
        type="textarea"
        required
        validations={[Validators.maxLength(300)]}
      />
      <Box sx={{ textAlign: "center" }}>
        <button
          className={`action-button ${!form.isValid && "disabled"}`}
          type="submit"
        >
          Save
        </button>
      </Box>
    </Formiz>
  );
};
//tilte, description, image, category
export default AddPost;
