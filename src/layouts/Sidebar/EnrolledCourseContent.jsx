import React, { useContext } from 'react'
import AuthContext from "@/context/context";

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Childhood Overweight & Obesity', 'sub2', [
    getItem('Lessons', 'lessonGroup', [
      getItem('OAdult and Childhood Obesity', '1'),
      getItem('Definition of Overweight & Obesity', '2'),
      getItem('The Stats', '3'),
      getItem('Obesity', '4'),
      getItem('Health Impact of Obesity: Type-2 Diabetes.', '5'),
      getItem('Diabetes', '6')
    ], 'group'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    getItem('Assignments', 'assignmentGroup', [getItem('Assignment 1', 'assignment1')], 'group'),
    getItem('Quizzes', 'quizGroup', [getItem('Quiz 1', 'quiz1')], 'group'),
  ]),
  {
    type: 'divider',
  },
];

const EnrolledCourseContent = ({ toast }) => {
  const { toggleSidebar } = useContext(AuthContext);

  const onClick = (e) => {
    console.log('click ', e);
  };

  if (!toggleSidebar) {
    return (
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    )
  }
}

export default EnrolledCourseContent