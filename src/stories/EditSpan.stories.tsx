import React from 'react';
import {ComponentStory, ComponentMeta, Meta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditSpan} from "../components/EditSpan";

export default {
  title: 'EditSpan',
  component: EditSpan,
  argTypes: {  //то что приходит в компоненту ,описываем сдесь пропсы
    apdateTask: {
      description:'callback' //любое описание
    },
    value:{
      description:'start value', //любое описание
      // defaultValue:'JS', //oбязательный параметр чтоб было видно в сторибуке эту компоненту как вариант 2

    },
    args:{   //как вариант 3
      value:'JS' ,
    }
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditSpan> = (args) => <EditSpan {...args} />;

export const EditSpanStory= Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditSpanStory.args = {   //история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк
  apdateTask:action(' apdateTask'),
  //value:'JS', //как вариант 1
};

