import * as Yup from 'yup';
import {
  AppointmentFormValues,
  LoginFormValues,
  RegisterFormValues,
} from './definitions';

export const initialValuesLogin: LoginFormValues = { email: '', password: '' };

export const initialValuesRegister: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};

export const initialValuesAppointment: AppointmentFormValues = {
  name: '',
  phone: '',
  time: '',
  email: '',
  comment: '',
};

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, 'Name should contain at least 2 characters')
    .max(20, 'Name should contain a maximum of 20 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const appointmentValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .min(2, 'Name should contain at least 2 characters')
    .max(20, 'Name should contain a maximum of 20 characters')
    .required('Name is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  time: Yup.string()
    .matches(
      /^(?:[01]\d|2[0-3]):[0-5]\d$/,
      'Time must be in the format HH:mm (24-hour)'
    )
    .required('Time is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  comment: Yup.string()
    .max(200, 'Comment should contain a maximum of 200 characters')
    .notRequired(),
});
