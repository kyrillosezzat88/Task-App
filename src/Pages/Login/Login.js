import { Formik, Form, Field } from "formik";
import "./Login.scss";
import { loginSchema } from "./Validation";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Apis/Firebase-Config";
import { toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  let formInitValue = {
    email: "",
    password: "",
  };
  return (
    <>
      <Navbar logedin={false} justLogo={true} />
      <section className="Login">
        <h2 className="pageTitle">Log in to Task </h2>
        <Formik
          initialValues={formInitValue}
          validationSchema={loginSchema}
          onSubmit={async (values , actions) => {
            await signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            )
              .then(() => {
                actions.setSubmitting(false);
                actions.resetForm()
                navigate("/home");
              })
              .catch((error) => toast(error.message, { type: "error" }));
          }}
        >
          {({ errors, touched , isSubmitting }) => (
            <Form className="CustomForm">
              <div className="CustomForm_field">
                <label htmlFor="email" className="CustomForm_field_label">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`CustomForm_field_input ${
                    errors.email &&
                    touched.email &&
                    "CustomForm_field_input_error"
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="CustomForm_field_error">{errors.email}</div>
                )}
              </div>
              <div className="CustomForm_field">
                <label htmlFor="password" className="CustomForm_field_label">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`CustomForm_field_input ${
                    errors.password &&
                    touched.password &&
                    "CustomForm_field_input_error"
                  }`}
                />
                {errors.password && touched.password && (
                  <div className="CustomForm_field_error">
                    {errors.password}
                  </div>
                )}
              </div>
              <button className="btn btn-primary w-full font-bold " disabled={isSubmitting}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
}

export default Login;
