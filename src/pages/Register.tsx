import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
    termsOfService: Yup.boolean().oneOf(
      [true],
      "You must accept the terms of service"
    ),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsOfService: false,
  };

  const handleSubmit = (values: any) => {
    setTimeout(() => {
      console.log(values);
      console.log(values);
    }, 400);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <motion.div
        className="card w-full max-w-md bg-base-100 shadow-xl"
        initial="initial"
        animate="animate"
        variants={cardVariants}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create Your Account</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-4">
                <AnimatePresence mode="wait">
                  {formStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">First Name</span>
                        </label>
                        <Field
                          name="firstName"
                          type="text"
                          placeholder="John"
                          className="input input-bordered w-full"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-error text-sm mt-1"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Last Name</span>
                        </label>
                        <Field
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                          className="input input-bordered w-full"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-error text-sm mt-1"
                        />
                      </div>

                      <div className="form-control mt-4">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            const firstName = values.firstName;
                            const lastName = values.lastName;
                            if (firstName && lastName) {
                              setFormStep(1);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          className="input input-bordered w-full"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-error text-sm mt-1"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                          <Field
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="input input-bordered w-full pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-error text-sm mt-1"
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Confirm Password</span>
                        </label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="input input-bordered w-full"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-error text-sm mt-1"
                        />
                      </div>

                      <div className="form-control mt-4 flex flex-row items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setFormStep(0)}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            const { email, password, confirmPassword } = values;
                            if (
                              email &&
                              password &&
                              password === confirmPassword
                            ) {
                              setFormStep(2);
                            }
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">
                            I agree to the Terms of Service and Privacy Policy
                          </span>
                          <Field
                            name="termsOfService"
                            type="checkbox"
                            className="checkbox checkbox-primary"
                          />
                        </label>
                        <ErrorMessage
                          name="termsOfService"
                          component="div"
                          className="text-error text-sm mt-1"
                        />
                      </div>

                      <div className="form-control mt-4 flex flex-row items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setFormStep(1)}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          {isSubmitting ? "Registering..." : "Create Account"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?
              <a href="/login" className="link link-primary ml-1">
                Log in
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
