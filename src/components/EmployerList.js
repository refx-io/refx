"use client";
import React, { useState } from 'react';
import { Col, Divider, Row, Form, Table, Button } from 'antd';
import { web3, Employee } from "../../ethereum/employee";


export default function EmployerList({db, employer, data, refresh}) {
  const [isLoading, setIsLoading] = useState(false);

  const approve = async (request) => {
    setIsLoading(true);
    const instance = new web3.eth.Contract(Employee.abi, request.employeeAddress);
    const accounts = await web3.eth.getAccounts();
    const address = await instance.methods.storeResult(request.employer, true).send({from: accounts[0]});
    db.approveCheck(request, address.transactionHash);
    setIsLoading(false);
    refresh();
  }

  const employerCols = [
    {
      title: 'Employee Hash',
      dataIndex: 'employeeHash',
      key: 'employee'
    },
    {
      title: 'Verified Status',
      dataIndex: 'verified',
      render: (value) => <span>{value ? 'TRUE' : 'FALSE'}</span>
    },
    {
      title: 'Reference Address',
      dataIndex: 'address',
    },
    {
      title: 'Actions',
      render: (value) => <><Button onClick={() => approve(value)} type="primary">Approve</Button></>
    }
  ];

  const result = data.map(it => ({
    ...it,
    employer: employer.address,
  }));

  return (
    <>
      <Divider orientation="left">List all pending requests (0xc5469483FBE5F33D1d3B5A1d08Cd36273BD188db)</Divider>
      <Table loading={isLoading} key={"employee"} columns={employerCols} dataSource={[...result]} rowKey={(record) => record.employeeAddress} />
    </>
  );
}
