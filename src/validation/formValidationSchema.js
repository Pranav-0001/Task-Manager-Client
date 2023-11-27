import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(32).required(),
});

export const signupSchema = yup.object().shape({
    email: yup.string().email().required(),
    username:yup.string().min(4).max(16).required(),
    password: yup.string().min(8).max(32).required(),

});

export const createTaskSchema=yup.object().shape({
    title:yup.string().required(),
    description:yup.string().required()
})
  