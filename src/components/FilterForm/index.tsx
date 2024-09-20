// import React, { useState } from "react";
import styles from "./index.module.scss";
import { Button, Form, Input, Select } from "antd";
interface OptionsType {
  name: string;
  value: string;
}
const SimpleForm = (props: {
  search1Options: OptionsType[];
  search2Options: OptionsType[];
  search1Change: (v: string) => void;
  search2Change: (v: string) => void;
  keywordChange: (e: any) => void;
  onAdd: () => void;
}) => {
  const {
    search2Options,
    search1Options,
    search1Change,
    search2Change,
    keywordChange,
    onAdd,
  } = props;
  // const [searchTerm, setSearchTerm] = useState("");
  // const [category1, setCategory1] = useState("全部");
  // const [category2, setCategory2] = useState("全部");

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleCategory1Change = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setCategory1(event.target.value);
  // };

  // const handleCategory2Change = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setCategory2(event.target.value);
  // };

  // const handleAdd = () => {
  //   console.log("Add button clicked");
  //   // 在这里添加新项目的逻辑
  // };

  return (
    <div className={styles.simpleForm}>
      <Button onClick={onAdd}>添加</Button>
      <Form layout="inline">
        <Form.Item name={"keyword"}>
          <Input placeholder="请输入搜索内容" onChange={keywordChange}></Input>
        </Form.Item>
        <Form.Item name={"search1"}>
          <Select
            placeholder="选择类型"
            style={{ width: 200 }}
            options={search1Options}
            onChange={search1Change}
          ></Select>
        </Form.Item>
        <Form.Item name={"search2"}>
          <Select
            style={{ width: 200 }}
            options={search2Options}
            onChange={search2Change}
          ></Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SimpleForm;
