import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../components/Task";
import {action} from "@storybook/addon-actions";
import {store} from "../state/store";
import {Provider} from "react-redux";

export default {   //нам нужно в тасках отрисовать 2 сосояния. чекнутые таски и нечекнутые
    title: 'Task',
    component: Task,
    args:{   changeTaskStatus: action('changeTaskStatus'), //будем показывать какой колбэк когда срабатывает входящий в эту компонету
    apdateTaskTitle: action('apdateTaskTitle'),
    removeTask: action('removeTask'),} //если оно лежит сдесь, значит приметится к каждой истории автоматически

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) =><Provider store={store}> <Task {...args}/> </Provider>;


export const TaskIsDoneStory = Template.bind({});    //1 story -task isDone -true
TaskIsDoneStory.args = {   //история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
    task: {id: "1", title: "CSS", isDone: true},
    todolistID: 'string',

};

export const TaskIsNotDoneStory = Template.bind({});    //2 story -task isDone -false
TaskIsNotDoneStory.args = {   //история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
    task: {id: "2", title: "JS", isDone: false},  //не забывать менять id
    todolistID: 'string2',

};



