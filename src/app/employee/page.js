"use client";
import { useRouter } from 'next/navigation'
import { Input, Button, Grid } from 'antd';
import React, { useState } from 'react';
import { Col, Divider, Row, Form, Table } from 'antd';
import DB, {Company} from '../../store/database';
import {loadState} from "@/store/store";
import EmployeeList from "@/components/EmployeeList";
import EmployerList from "@/components/EmployerList";

export default function Employee() {
  const router = useRouter();

  const [employee, setEmployee] = React.useState({});
  const [referenceList, setReferenceList] = React.useState([]);

  const [company, setCompany] = React.useState(Company[0]);
  const [requestList, setRequestList] = React.useState([]);

  const onFinish = (values) => {
    DB.insertNewRequest(employee.nullifier_hash, values.companyAddress);

    setReferenceList(DB.loadAllReferences(employee.nullifier_hash));

    const reqs = DB.loadAllPendingRequests(company.address);
    setRequestList(reqs);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onHandleRefresh = () => {
    console.log('refresh reference', JSON.stringify(DB.loadAllReferences(employee.nullifier_hash)));
    setReferenceList(DB.loadAllReferences(employee.nullifier_hash));
    setRequestList(DB.loadAllPendingRequests(company.address));
  }

  React.useEffect(() => {
    const emp = loadState();
    setEmployee(emp);
    if (!emp || !emp.nullifier_hash) {
      return router.push('signup')
    }
    setReferenceList(DB.loadAllReferences(employee.nullifier_hash));
    setRequestList(DB.loadAllPendingRequests(company.address));
  }, [])

  return (
    <>
      <Divider orientation="left">Submit new reference check request</Divider>
      <Row>
        <Col span={12} offset={6}>
          <Form
            name="basic"
            layout={"inline"}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="companyAddress" label="Company Address">
              <Input placeholder="please input company address" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <br />
      <EmployeeList db={DB} employee={employee} data={referenceList} />
      <EmployerList db={DB} employer={company} data={requestList} refresh={onHandleRefresh} />
    </>
  );
}
