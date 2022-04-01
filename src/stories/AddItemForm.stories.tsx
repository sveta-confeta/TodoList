import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
  title: 'AddItemForm',
  component: AddItemForm,
  
  argTypes: {  //то что приходит в компоненту
    addItem: {
      description:'callback' //любое описание
    }
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory= Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {   //история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
 addItem:action('addItem')
};

