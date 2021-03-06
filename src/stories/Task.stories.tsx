import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../components/Task";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {   //нам нужно в тасках отрисовать 2 сосояния. чекнутые таски и нечекнутые
    title: 'Task',
    component: Task,
    decorators:[ ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => {

   return <Task
       taskID={'1'}
       todolistID={'string'}
   />
};

// export const TaskIsNotDoneStory = Template.bind({});    //2 story -task isDone -false
// TaskIsNotDoneStory.args = {   //история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
//     task: {id: "2", title: "JS", isDone: false},  //не забывать менять id
//     todolistID: 'string2',
//
// };



