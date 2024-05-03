"use client";
import React, { useState } from 'react';
import {Col, Divider, Row, Form, Table, Button} from 'antd';
import DB from "@/store/database";

export default function EmployeeList({db, employee, data}) {
  const [employeeList, setEmployeeList] = useState([]);

  const employeeCols = [
    {
      title: 'Company Address',
      dataIndex: 'employer',
      key: 'employer',
    },
    {
      title: 'Verified Status',
      dataIndex: 'verified',
      key: 'verified',
      render: (value) => <span>{value ? "TRUE": "FALSE"}</span>
    },
    {
      title: 'Published Address',
      dataIndex: 'address',
    }
  ];

  React.useEffect(() => {
    setEmployeeList(data);
  }, [JSON.stringify(data)])

  return (
    <>
      <Divider orientation="left">List all references : {employee?.name} / {employee?.address} </Divider>
      <Table  key={"employee"} columns={employeeCols} dataSource={[...employeeList]} rowKey={(record) => record.employer} />
    </>
  );
}
