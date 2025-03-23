import React, { useEffect, useState } from "react";

export default function FileInput({ 
  label, 
  fieldName, 
  formik, 
  externalError = "", 
  buttonColor = "#B72A67", 
  showPreview = true, 
  maxFileSizeMB = 5 
}) {
  const file = formik.values[fieldName];
  const [preview, setPreview] = useState(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (file && showPreview) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file, showPreview]);

  const formikError =
    formik.touched[fieldName] && formik.errors[fieldName] ? formik.errors[fieldName] : null;

  const handleFileChange = (e) => {
    setFileError("");
    const chosenFile = e.target.files[0];

    if (chosenFile) {
      // Check type
      if (!chosenFile.type.startsWith("image/")) {
        setFileError("Please upload an image file (jpg,png,jpeg.)");
        formik.setFieldValue(fieldName, null);
        return;
      }
      // Check size
      const fileSizeMB = chosenFile.size / (1024 * 1024);
      if (fileSizeMB > maxFileSizeMB) {
        setFileError(`File must be under ${maxFileSizeMB}MB!`);
        formik.setFieldValue(fieldName, null);
        return;
      }
    }

    formik.setFieldValue(fieldName, chosenFile || null);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label className="form-label" style={{ marginRight: "10px" }}>
        {label}
      </label>
      <div className="d-flex align-items-center" style={{ marginBottom: "10px" }}>
        <label
          className="btn"
          style={{
            backgroundColor: buttonColor,
            color: "white",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        >
          Choose file
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
        <span>{file ? file.name : "No file chosen"}</span>
      </div>

      {/* Fixed-size container to prevent layout shift */}
      <div
        style={{
          marginTop: "6px",
          width: "120px",
          height: "80px",     // Always reserve space
          position: "relative",
          overflow: "hidden",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        ) : (
          // If no preview, display a placeholder so the box remains the same size
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px dashed #ccc",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              fontSize: "12px",
            }}
          >
            No preview
          </div>
        )}
      </div>

      {/* File-specific error (type/size) */}
      {fileError && (
        <div className="text-danger" style={{ marginTop: "4px" }}>
          {fileError}
        </div>
      )}
       {/* External logic errors like duplicate file */}
    {externalError && (
      <div className="text-danger" style={{ marginTop: "4px" }}>
        {externalError}
      </div>
    )}

      {/* Formik-required error */}
      <div style={{ minHeight: "1.25rem" }}>
        {formikError && <div className="text-danger">{formikError}</div>}
      </div>
    </div>
  );
}
