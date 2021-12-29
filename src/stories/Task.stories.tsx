import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {Provider} from "react-redux";
import {store} from "../store/store";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLISTS/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    //some common functions
  }

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Provider store={store}><Task {...args} /></Provider>;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

TaskIsDoneStory.args = {
  todoListId: '123',
  task: {id: '1', title: 'HTML', isDone: true}

};


export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

TaskIsNotDoneStory.args = {
  todoListId: '123',
  task: {id: '1', title: 'HTML', isDone: false}

};
