import { Formiz, useForm } from "@formiz/core";
import Select from "../form/Select";
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/material";
import LoadingCircle from "../LoadingCircle";
import { useState } from "react";
import { DeleteCategory } from "../../repositories/UserRepository";

interface IRemoveCategory {
  Category: string;
}

const RemoveCategory = () => {
  const [state, setState] = useState(0);
  const { user, refreshCategories } = useAuth();
  const form = useForm<IRemoveCategory>({
    onValidSubmit: (values) => {
      setState(1);
      DeleteCategory(user, values.Category).then((result) => {
        setState(result ? 2 : 3);
        if (result) refreshCategories();
      });
    },
  });
  return (
    <>
      <h2>Remove Category</h2>
      {state === 1 && <LoadingCircle height="100vh" />}
      {state !== 1 && (
        <Formiz connect={form} autoForm>
          {state === 2 && (
            <p className="form-error-feedback green text-center">
              Category Removed!
            </p>
          )}
          {state === 3 && (
            <p className="form-error-feedback text-center">
              Unable to remove the category
            </p>
          )}
          <Select
            className="add-post-select"
            name="Category"
            label="Category"
            required
            itemsList={user!.categories}
          />
          <Box sx={{ textAlign: "center" }}>
            <button
              className={`action-button ${!form.isValid && "disabled"}`}
              type="submit"
            >
              Remove
            </button>
          </Box>
        </Formiz>
      )}
    </>
  );
};

export default RemoveCategory;
