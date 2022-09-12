import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useParams , useNavigate } from "react-router-dom";
import { db } from "../../Apis/Firebase-Config";
import { Formik, Form, Field } from "formik";
import TaskSchema from "../../Components/AddTask/Validations";
import DatePicker from "react-datepicker";
import Navbar from "../../Components/Navbar/Navbar";
import { toast } from "react-toastify";
import "./EditTask.scss";
import { useTask } from "../../Context/TaskContext";
import { loadData } from "../../Context/Actions/Auth-Actions";
import Spinner from "../../Assets/Images/spinner.gif";
import { UpdateTask } from "../../Context/Actions/Task-Actions";

const EditTask = () => {
  const { TaskApp, dispatch } = useTask();
  const [Task, setTask] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loadData(true));
    let TaskDoc = doc(db, "tasks", id);
    getDoc(TaskDoc)
      .then((doc) => {
        setTask(doc.data());
        dispatch(loadData(false));
      })
      .catch((err) => toast(err.message, { type: "error" }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <Navbar logedin={true} justLogo={false} />
      {!TaskApp.isLoading ? (
        <section className="EditTask">
          <h2>Edit Task</h2>
          <Formik
            initialValues={{
              ...Task,
              dueDate: Task.dueDate
                ? new Date(Task.dueDate.seconds * 1000)
                : new Date(),
            }}
            validationSchema={TaskSchema}
            enableReinitialize
            onSubmit={async (values) => {
              let TaskDoc = doc(db, "tasks", id);
              // update task in firebase and win global state
              await updateDoc(TaskDoc,values).then(() => {
                toast('Task Updated Successfully' , {type:"success"});
                dispatch(UpdateTask({id,...values}))
                navigate('/home')
              }).catch(error => toast(error.message , {type:"error"}));
            }}
          >
            {({ errors, touched, isSubmitting, isValid }) => (
              <Form className="CustomForm" onClick={(e) => e.stopPropagation()}>
                <div>{isValid}</div>
                <div className="CustomForm_field">
                  <label htmlFor="title" className="CustomForm_field_label">
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    placeholder="Task Title"
                    defaultValue={Task.title}
                    className={`CustomForm_field_input ${
                      errors.title &&
                      touched.title &&
                      "CustomForm_field_input_error"
                    }`}
                  />
                  {errors.title && touched.title && (
                    <div className="CustomForm_field_error">{errors.title}</div>
                  )}
                </div>
                <div className="CustomForm_field">
                  <label
                    htmlFor="description"
                    className="CustomForm_field_label"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Task Description"
                    className="CustomForm_field_input"
                  />
                </div>
                <div className="CustomForm_field">
                  <label htmlFor="priority" className="CustomForm_field_label">
                    Priority
                  </label>
                  <Field name="priority" id="priority" as="select">
                    <option value="priority" selected disabled>
                      select priority
                    </option>
                    <option value="heigh">Heigh</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </Field>
                  {errors.priority && touched.priority && (
                    <div className="CustomForm_field_error">
                      {errors.priority}
                    </div>
                  )}
                </div>
                <div className="CustomForm_field">
                  <label
                    htmlFor="description"
                    className="CustomForm_field_label"
                  >
                    Due Date
                  </label>
                  <Field className="DatePicker" name="dueDate">
                    {({ field, form }) => {
                      const { setFieldValue } = form;
                      const { value } = field;
                      return (
                        <div className="DatePicker">
                          <DatePicker
                            selected={value}
                            minDate={new Date()}
                            placeholderText="Due Date"
                            onChange={(date) => {
                              setFieldValue("dueDate", date);
                            }}
                          />
                        </div>
                      );
                    }}
                  </Field>
                  {errors.dueDate && touched.dueDate && (
                    <div className="CustomForm_field_error">
                      {errors.dueDate}
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-6">
                  <button className="btn btn-primary" disabled={isSubmitting}>
                    Add Task
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      ) : (
        <div className="loading">
          <img src={Spinner} alt="Loading..." />
        </div>
      )}
    </>
  );
};

export default EditTask;
