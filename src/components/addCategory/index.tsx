import { Formiz, useForm } from "@formiz/core";
import { useState } from "react";
import LoadingCircle from "../LoadingCircle";
import Input from "../form/Input";
import InputImage from "../form/ImageInput";
import { Box } from "@mui/material";
import Validators from "../form/Validators";
import { UploadCategory } from "../../repositories/UserRepository";
import IAddCategory from "./IAddCategory";
import { useAuth } from "../../contexts/AuthContext";

const AddCategory = () => {
  const [state, setState] = useState(0);
  const { user } = useAuth();
  const form = useForm<IAddCategory>({
    onValidSubmit: (values) => {
      setState(1);
      UploadCategory(values).then((result) => {
        setState(result ? 2 : 3);
        if (result) user?.updateCategories();
      });
    },
  });

  if (state === 1) return <LoadingCircle height="100vh" />;
  return (
    <Formiz connect={form} autoForm>
      {state === 2 && (
        <p className="form-error-feedback green text-center">Category added!</p>
      )}
      {state === 3 && (
        <p className="form-error-feedback text-center">
          Unable to added the category
        </p>
      )}
      <InputImage name="Image" required />
      <Input
        className="add-post-select"
        name="Name"
        label="Name"
        required
        validations={[Validators.alphabetic, Validators.maxLength(20)]}
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

export default AddCategory;
