import * as yup from 'yup';


const TaskSchema = yup.object().shape({
    title:yup.string().required('Title Required '),
    description:yup.string(),
    priority:yup.string().required('Priority required'),
    dueDate:yup.date().required('Due Date Required!').nullable()

})

export default TaskSchema;