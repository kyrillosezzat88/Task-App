import { Formik, Form, Field } from "formik";
import { userSchema } from "./Validation";
import "./Signup.scss";
import Navbar from "../../Components/Navbar/Navbar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Apis/Firebase-Config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const userCollection = collection(db, "users");

  let formInitValue = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  return (
    <>
      <Navbar logedin={false} justLogo={true} />
      <section className="Signup">
        <h2 className="pageTitle">Sign Up</h2>
        <p className="pageSubTitle">
          By signing up, I agree to the Task
          <span className="pageSubTitle_links">Privacy Policy</span> and
          <span className="pageSubTitle_links">Terms of Service</span>.
        </p>
        <Formik
          initialValues={formInitValue}
          validationSchema={userSchema}
          onSubmit={async (values , actions) => {
            await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            )
              .then(async (res) => {
                await addDoc(userCollection, {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  email: values.email,
                  id: res.user.uid,
                })
                  .then(() => {
                    toast("Account Created Succsefully", { type: "success" });
                    actions.setSubmitting(false);
                    actions.resetForm()
                    navigate("/home");
                  })
                  .catch((error) => toast(error.message, { type: "error" }));
              })
              .catch((error) => toast(error.message, { type: "error" }));
          }}
        >
          {({ errors, touched  , isSubmitting}) => (
            <Form className="CustomForm">
              <div className="CustomForm_field">
                <label htmlFor="firstname" className="CustomForm_field_label">
                  First Name
                </label>
                <Field
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  className={`CustomForm_field_input ${
                    errors.firstname &&
                    touched.firstname &&
                    "CustomForm_field_input_error"
                  }`}
                />
                {errors.firstname && touched.firstname && (
                  <div className="CustomForm_field_error">
                    {errors.firstname}
                  </div>
                )}
              </div>
              <div className="CustomForm_field">
                <label htmlFor="lastname" className="CustomForm_field_label">
                  Last Name
                </label>
                <Field
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  className="CustomForm_field_input"
                />
              </div>
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
              <div className="CustomForm_field">
                <label
                  htmlFor="confirm_password"
                  className="CustomForm_field_label"
                >
                  Confirm Password
                </label>
                <Field
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  className={`CustomForm_field_input ${
                    errors.confirm_password &&
                    touched.confirm_password &&
                    "CustomForm_field_input_error"
                  }`}
                />
                {errors.confirm_password && touched.confirm_password && (
                  <div className="CustomForm_field_error">
                    {errors.confirm_password}
                  </div>
                )}
              </div>
              <button className="btn btn-primary w-full font-bold " disabled={isSubmitting}>
                Register
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default Signup;
