import React from "react";
import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import "./AddedFile.css";

interface AddedFileProps {
  name: string;
  removeAddedFile: (fileName: string) => void;
}

const AddedFile: React.FC<AddedFileProps> = props => {
  const fileName = props.name;
  const removeAddedFile = props.removeAddedFile;
  return (
    <Box className="added-file" box-shadow={0}>
      {fileName}
      <CancelIcon
        className="delete-file-icon"
        onClick={() => removeAddedFile(fileName)}
      />
    </Box>
  );
};

export default AddedFile;
