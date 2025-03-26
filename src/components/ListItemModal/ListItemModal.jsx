import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../RegisterComponents/TextInput';
import FileInput from '../RegisterComponents/FileInput';
import useAuthStore from '../../Store/Auth';
import useProductStore from '../../Store/product';

export default function ListItemModal() {
  const { token } = useAuthStore();
  const { postProduct } = useProductStore();

  const initialValues = {
    title: '',
    description: '',
    brand: 'brand',
    category: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    daily: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, 'Title should be at least 3 characters long')
      .max(29, 'Title should be at most 29 characters long')
      .matches(
        /^[a-zA-Z0-9_ ]+$/,
        'Only letters, numbers, underscores, and spaces are allowed.'
      )
      .required('Title is required'),
    description: Yup.string()
      .min(3, 'Description should be at least 3 characters long')
      .required('Description is required'),
    category: Yup.string().required('Category is required'),
    image1: Yup.string().required('Image 1 is required'),
    image2: Yup.string(),
    image3: Yup.string(),
    image4: Yup.string(),
    price: Yup.number()
      .min(0, 'Price should be at least 0')
      .required('Price is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('images', values.image1); // Use 'images' as the field name
      if (values.image2) formData.append('images', values.image2);
      if (values.image3) formData.append('images', values.image3);
      if (values.image4) formData.append('images', values.image4);
      Object.keys(values).forEach((key) => {
        if (
          key !== 'image1' &&
          key !== 'image2' &&
          key !== 'image3' &&
          key !== 'image4'
        ) {
          if (key === 'price') {
            formData.set('daily', values[key]);
          } else if (key === 'title') {
            formData.append('name', values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }
      });
      try {
        await postProduct(token, formData);

        // Remove the classes from the body and remove the div with modal-backdrop show
        document.querySelector('#profileModal').modal('hide');
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleModalClose = () => {
    formik.resetForm();
  };

  return (
    <div
      className="modal modal-lg fade col-10"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen-lg-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Rent your product
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
              <TextInput type="text" label="Title" id="title" formik={formik} />
              <TextInput
                type="text"
                label="Description"
                id="description"
                formik={formik}
              />
              <TextInput
                type="text"
                label="Category"
                id="category"
                formik={formik}
              />
              <div className="d-flex justify-content-between">
                <FileInput label="Image 1" fieldName="image1" formik={formik} />
                <FileInput label="Image 2" fieldName="image2" formik={formik} />
                <FileInput label="Image 3" fieldName="image3" formik={formik} />
                <FileInput label="Image 4" fieldName="image4" formik={formik} />
              </div>
              <TextInput
                type="number"
                label="Price"
                id="price"
                formik={formik}
              />
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
                Rent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
