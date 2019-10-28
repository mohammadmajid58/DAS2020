import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.css";

interface DropZoneProps {
  filesHandler: (files: File[]) => void;
}

const DropZone: React.FC<DropZoneProps> = props => {
  const filesHandler = props.filesHandler;

  const onDrop = useCallback(
    files => {
      filesHandler(files);
    },
    [filesHandler]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="dragDropContainer col-sm-6 col-md-4 col-lg-3"
    >
      <input {...getInputProps()} />
      <div className="dragDropElement">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default DropZone;
