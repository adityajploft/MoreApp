import * as Yup from "yup";

      export const registerSchema = Yup.object({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        mobile: Yup.string().required('Mobile number is required'),
      });
   
