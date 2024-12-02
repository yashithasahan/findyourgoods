import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formStep, setFormStep] = useState(0);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

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
          <h2 className="card-title text-center mb-4">Welcome Back</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              dispatch(login(values.email));
            }}
          >
            {({ isSubmitting }) => (
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

                      <div className="form-control mt-4">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setFormStep(1)}
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

                      <div className="form-control mt-4 flex flex-row items-center gap-2">
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => setFormStep(0)}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          {isSubmitting ? "Logging in..." : "Login"}
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
              Don't have an account?
              <a href="/register" className="link link-primary ml-1">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
