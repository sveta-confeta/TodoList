import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AppWhithRedux} from "../AppWhithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
  title: 'AppWhithRedux',
  component: AppWhithRedux,
  decorators:[ ReduxStoreProviderDecorator],
                                      //ничего не приходит в эту компоненту
} as ComponentMeta<typeof AppWhithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWhithRedux> = (args) =>  <AppWhithRedux />;
//ошибка про провайдер может сообщать что нашу компоненту нужно обернуть в провайдер

export const AppWhithReduxStory= Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWhithReduxStory.args = {   //история , сдесь хватит и одной: то что мы хотим увидеть:нашу форму и чтоб при нажатии срабатывал наш колбэк

};

