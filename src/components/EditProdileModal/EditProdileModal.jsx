import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import TextInput from '../RegisterComponents/TextInput';
import PasswordInput from '../RegisterComponents/PasswordInput';
import useAuthStore from '../../Store/Auth';
import useProfileStore from '../../Store/profile';
import { useParams } from 'react-router-dom';

export default function EditProdileModal({ profile }) {
  const { id:userId } = useParams();
  const { token } = useAuthStore();
  const { updateProfile } = useProfileStore();

  const initialValues = {
    userName: profile.userName,
    email: profile.email,
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
    .min(3, "Name should be at least 3 characters long")
    .max(29, "Name should be at most 29 characters long")
    .matches(/^[a-zA-Z0-9_ ]+$/, "Only letters, numbers, underscores, and spaces are allowed.")
    .required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    newPassword: Yup.string()
    .min(8, "Password should be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase letter, one number, and one special character"
    ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase, one lowercase letter, one number, and one special character"
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const updatedData = {
        userName: values.userName,
        email: values.email,
        password: values.newPassword ? values.newPassword : undefined,
      };
      try {
        await updateProfile(userId,token, updatedData);


      // Remove the classes from the body and remove the div with modal-backdrop show
      document.querySelector('#profileModal').modal('hide');

    formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleModalClose = () => {
    formik.resetForm();
  };

  return (
    <div
      className="modal modal-lg fade col-10"
      id="profileModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-lg-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit your profile
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleModalClose}
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body">
              <TextInput label="Name" id="userName" formik={formik}/>
              <TextInput label="Email" id="email" formik={formik}/>
              <PasswordInput label="New Password" id="newPassword" formik={formik}/>
              <PasswordInput label="Confirm Password" id="confirmPassword" formik={formik}/>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
