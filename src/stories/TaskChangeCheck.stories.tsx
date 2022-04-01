import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../components/Task";
import {action} from "@storybook/addon-actions";

export default {   //нам нужно в тасках отрисовать 2 сосояния. чекнутые таски и нечекнутые
    title: 'TaskChangeCheckBox',
    component: Task,
    args: {
        // changeTaskStatus: action('changeTaskStatus'), //будем показывать какой колбэк когда срабатывает входящий в эту компонету
        // apdateTaskTitle: action('apdateTaskTitle'),
        // removeTask: action('removeTask'),
    } //если оно лежит сдесь, значит приметится к каждой истории автоматически

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = () => {
    const [task, setTask] = useState({id: "1", title: "CSS", isDone: true});
    const changeTaskStatus = () => setTask({id: "1", title: "CSS", isDone: !task.isDone}) //меняем состояние

    return <Task todolistID={'id'}
                 task={task}
                 changeTaskStatus={action('changeTaskStatus')} //будем показывать какой колбэк когда срабатывает входящий в эту компонету
                  apdateTaskTitle={action('apdateTaskTitle')}
                    removeTask={action('removeTask')}
    />

}


export const TaskIsDoneStory = Template.bind({});
    TaskIsDoneStory.args = {
    };





