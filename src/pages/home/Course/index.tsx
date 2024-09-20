import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select } from "antd";
import { Course } from "./type";
import styles from "./index.module.scss";
import { LocalStorageManager } from "@/utils";
const { Option } = Select;
import Header from "@/components/Header";
import FilterForm from "@/components/FilterForm";
const CoursePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [storage] = useState(new LocalStorageManager("course"));

  useEffect(() => {
    // 模拟从API获取数据
    const mockData: Course[] = [
      {
        id: "1",
        name: "气象网络营",
        description: "气象网络营课程内容学习与实等课程科目",
        totalHours: 6,
        level: "初小",
      },
      {
        id: "2",
        name: "雨水花园的生态研究",
        description: "探索自然生态，通过亲自动手种花美菜感受生态之美",
        totalHours: 7,
        level: "初小",
      },
      {
        id: "3",
        name: "植物工厂的妙处之最",
        description: "植物工厂里有哪些妙处?快来一起探索吧",
        totalHours: 7,
        level: "初小",
      },
    ];
    const list: any[] = storage.getAll();
    if (list.length) {
      setCourses(list);
      return;
    }
    setCourses(mockData);
  }, []);

  const showModal = (course?: Course) => {
    if (course) {
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
        setCourses(
          courses.map((c) =>
            c.id === editingCourse.id ? { ...values, id: editingCourse.id } : c
          )
        );
      } else {
        // 创建
        const newCourse = { ...values, id: Date.now().toString() };
        setCourses([...courses, newCourse]);
      }
      setIsModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const columns = [
    { title: "课程名称", dataIndex: "name", key: "name" },
    { title: "简介", dataIndex: "description", key: "description" },
    { title: "总课时", dataIndex: "totalHours", key: "totalHours" },
    { title: "分类", dataIndex: "level", key: "level" },
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

  return (
    <div className={styles.crudPage}>
      <Header title={"课程中心"} />
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
          search1Change={(v) => {}}
          search2Change={(v) => {}}
          keywordChange={(e) => {}}
        />
      </div>
      <Table columns={columns} dataSource={courses} rowKey="id" />
      <Modal
        title={editingCourse ? "编辑课程" : "添加课程"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="课程名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="简介"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="totalHours"
            label="总课时"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="level" label="分类" rules={[{ required: true }]}>
            <Select>
              <Option value="幼儿">幼儿</Option>
              <Option value="初小">初小</Option>
              <Option value="高小">高小</Option>
              <Option value="初中">初中</Option>
              <Option value="高中">高中</Option>
              <Option value="我的课程">我的课程</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoursePage;
