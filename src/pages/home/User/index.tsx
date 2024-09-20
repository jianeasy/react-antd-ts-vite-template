import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { Course } from "./type";
import styles from "./index.module.scss";
import { LocalStorageManager } from "@/utils";
import Header from "@/components/Header";
import FilterForm from "@/components/FilterForm";
const UserPage: React.FC = () => {
  const [users, setUsers] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [storage] = useState(new LocalStorageManager("user"));
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    // 模拟从API获取数据
    const mockData: Course[] = [
      {
        id: "1",
        username: "Codejoy123",
        role: "Admin",
        name: "Administrator",
        ProgrammingExperience: "",
        courses: "",
      },
      {
        id: "2",
        username: "admin",
        role: "Admin",
        name: "Administrator",
        ProgrammingExperience: "",
        courses: "",
      },
      {
        id: "3",
        username: "Teacher",
        role: "Teacher",
        name: "小酷教师",
        ProgrammingExperience: "",
        courses: "",
      },
    ];

    const users: any[] = storage.getAll();
    if (users.length) {
      setUsers(users);
      return;
    }
    setUsers(mockData);
    mockData.forEach((item) => {
      storage.add(item);
    });
  }, []);

  const showModal = (course?: Course) => {
    if (course) {
      setIsEdit(true);
      setEditingCourse(course);
      form.setFieldsValue(course);
    } else {
      setEditingCourse(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingCourse) {
        // 更新
        setUsers(
          users.map((c) =>
            c.id === editingCourse.id ? { ...values, id: editingCourse.id } : c
          )
        );
        storage.update(editingCourse.id, { ...values, id: editingCourse.id });
      } else {
        // 创建
        const newCourse = { ...values, id: Date.now().toString() };
        storage.add(newCourse);
        setUsers([...users, newCourse]);
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((c) => c.id !== id));
  };

  const columns = [
    { title: "用户名", dataIndex: "username", key: "username" },
    { title: "角色", dataIndex: "role", key: "role" },
    { title: "姓名", dataIndex: "name", key: "name" },
    {
      title: "编程经验",
      dataIndex: "ProgrammingExperience",
      key: "ProgrammingExperience",
    },
    { title: "参与课程", dataIndex: "courses", key: "courses" },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: Course) => (
        <span>
          <Button onClick={() => showModal(record)}>编辑</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            删除
          </Button>
        </span>
      ),
    },
  ];
  const handleSearch = (event: any) => {
    console.log(event.target.value);

    const hasValue = (obj: any, v: string) => {
      let res = false;
      for (let key in obj) {
        if (obj[key].indexOf(v) >= 0) {
          return true;
        }
      }
      return res;
    };
    const v = event.target.value;
    if (!v) {
      setUsers(storage.getAll() as any[]);
      return;
    }
    let list = users.filter((user) => {
      return hasValue(user, v);
    });
    if (list.length) {
      setUsers(list);
    }
  };
  return (
    <div className={styles.crudPage}>
      <Header title={"用户中心"} />
      <div>
        <FilterForm
          onAdd={() => {
            showModal();
          }}
          search1Options={[
            { name: "小学", value: "小学" },
            { name: "全部", value: "全部" },
          ]}
          search2Options={[{ name: "全部", value: "全部" }]}
          search1Change={(v) => {
            handleSearch(v);
          }}
          search2Change={() => {}}
          keywordChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>
      <Table columns={columns} dataSource={users} rowKey="id" />
      <Modal
        title={editingCourse ? "编辑用户" : "添加用户"}
        visible={isModalVisible}
        onOk={handleOk}
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setIsModalVisible(false);
          setIsEdit(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            hidden={isEdit}
            name="password"
            label="密码"
            rules={[{ required: !isEdit }]}
          >
            <Input placeholder="密码" />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            <Select
              placeholder="请选择"
              options={[
                { name: "Admin", value: "Admin" },
                { name: "Teacher", value: "Teacher" },
                { name: "student", value: "student" },
              ]}
            />
          </Form.Item>
          <Form.Item name="name" label="姓名">
            <Input placeholder="姓名"></Input>
          </Form.Item>
          <Form.Item name="ProgrammingExperience" label="编程经验">
            <Input placeholder="姓名"></Input>
          </Form.Item>
          <Form.Item name="courses" label="参与课程">
            <Select placeholder="请选择"></Select>
          </Form.Item>
          <Form.Item name="phone" label="绑定手机号">
            <Input placeholder="手机号"></Input>
          </Form.Item>
        </Form>
      </Modal>

      <Modal></Modal>
    </div>
  );
};

export default UserPage;
