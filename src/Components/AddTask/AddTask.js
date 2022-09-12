import { Formik, Form, Field } from "formik";
import TaskSchema from "./Validations";
import "./AddTask.scss";
import DatePicker from "react-datepicker";
import { addDoc , collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Apis/Firebase-Config";
import { useTask } from "../../Context/TaskContext";
import { GetAllUserTasks } from "../../Context/Actions/Task-Actions";
import {toast} from 'react-toastify'
const AddTask = ({setOpenTask}) => {
  const {TaskApp , dispatch} = useTask()
  const TasksCollection = collection(db,'tasks');
  const Taskinit = {
    title: "",
    description: "",
    priority: "",
    dueDate: "",
  };
  return (
    <div className="AddTask" >
      <Formik
        initialValues={Taskinit}
        validationSchema={TaskSchema}
        onSubmit={async(values, actions) => {
          // add new task then get all user tasks 
          await addDoc(TasksCollection,{...values , status:'todo', userID:TaskApp.user.uid , createdAt:new Date()}).then(async res =>{
            actions.setSubmitting(false);
            actions.resetForm();
            let q = query(TasksCollection,where('userID','==',TaskApp.user.uid))
            let userTasks = await getDocs(q).then(res => res.docs.map(doc => ({...doc.data() , id:doc.id})))
            dispatch(GetAllUserTasks(userTasks));
            toast("Task Added Successfully",{type:'success'});
            setOpenTask(false)
          }).catch(err => toast(err.message , {type:'error'}));
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
              <label htmlFor="description" className="CustomForm_field_label">
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
                <div className="CustomForm_field_error">{errors.priority}</div>
              )}
            </div>
            <div className="CustomForm_field">
              <label htmlFor="description" className="CustomForm_field_label">
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
                <div className="CustomForm_field_error">{errors.dueDate}</div>
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
    </div>
  );
};

export default AddTask;
