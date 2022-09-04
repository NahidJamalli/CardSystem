import { Button, Form, Input, Modal, Select, Table } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { IAccount } from "../models/Account";
import { useStore } from "../store";

const Accounts = () => {
  const [accountForm] = Form.useForm();
  const [amountForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountId, setAccountId] = useState<number>(0);
  const [isAmountModalVisible, setIsAmountModalVisible] = useState(false);
  const { accountStore } = useStore();

  const onSubmitAccount = (account: IAccount) => {
    accountStore.createAccount(account).then(() => accountStore.getAccounts())
    setIsModalVisible(false)
    accountForm.resetFields()
  }

  const addAmount = (id: number) => {
    setAccountId(id)
    setIsAmountModalVisible(true)
  };

  const onSubmitAmount = ({ amount }: any) => {
    accountStore.createAmount({
      amount: amount,
      accountId: accountId
    }).then(() => accountStore.getAccounts())
    setIsAmountModalVisible(false)
    amountForm.resetFields()
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render:(value:number,card:IAccount,index:number) =><p>{index+1}</p>
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, account: IAccount) => (
        <Button type="link" onClick={() => addAmount(account.id)}>
          Add Amount
        </Button>
      ),
    },
  ];

  useEffect(() => {
    accountStore.getAccounts()
  }, [])

  return (
    <div style={{margin:20}} >
      <Button type="primary" style={{margin:20}} onClick={() => setIsModalVisible(true)}>Add</Button>
      <Table rowKey="id" columns={columns} dataSource={accountStore.accounts} />
      <Modal
        title="Add Account"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={300}
      >
        <Form form={accountForm} onFinish={onSubmitAccount} labelCol={{
          span: 24,
        }}
          wrapperCol={{
            span: 24,
          }}>
          <Form.Item label="Balance" name="balance" rules={[
            {
              required: true,
              message: "Please input your balance!",
            },
          ]}>
            <Input type="number" step="0.1" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[
            {
              required: true,
              message: "Please input your type!",
            },
          ]}>
            <Select>
              <Select.Option value="Deposit">Deposit</Select.Option>
              <Select.Option value="Credit">Credit</Select.Option>
              <Select.Option value="Currency">Currency</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Amount"
        visible={isAmountModalVisible}
        onCancel={() => setIsAmountModalVisible(false)}
        footer={null}
        width={300}
      >
        <Form form={amountForm} onFinish={onSubmitAmount} labelCol={{
          span: 24,
        }}
          wrapperCol={{
            span: 24,
          }}>
          <Form.Item label="Amount" name="amount" rules={[
            {
              required: true,
              message: "Please input your amount!",
            },
          ]}>
            <Input type="number" step="0.1" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default observer(Accounts);
