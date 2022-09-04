import { Button, Checkbox, Form, Input, Modal, Select, Table } from "antd";
import { ICard } from "../models/Card";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";
import { useEffect, useState } from "react";

const Cards = () => {
  const [cardForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCurrencyVisible, setIsCurrencyVisible] = useState(false);
  const [id, setId] = useState<number>(0);
  const { cardStore } = useStore();

  const onSave = (card: ICard) => {
    card.id = id
    if (id === 0) {
      cardStore.createCard(card).then(() => cardStore.getCards())
    }
    else {
      cardStore.updateCard(card).then(() => cardStore.getCards())
    }
    setIsModalVisible(false)
    setIsCurrencyVisible(false)
    cardForm.resetFields()
  };
  const onEdit = (card: ICard) => {
    setId(card.id)
    setIsModalVisible(true)
    cardForm.setFieldsValue(card)
    cardForm.getFieldValue('type') === 'Currency' ? setIsCurrencyVisible(true) : setIsCurrencyVisible(false)
  };

  const onChangeType = (value: string) => {
    cardForm.setFieldValue('currency', '')
    value === 'Currency' ? setIsCurrencyVisible(true) : setIsCurrencyVisible(false)
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render:(value:number,card:ICard,index:number) =><p>{index+1}</p>
    },
    {
      title: "Card Number",
      dataIndex: "cardNumber",
      key: "cardNumber",
    },
    {
      title: "Is Valid",
      dataIndex: "isValid",
      key: "isValid",
      render: (isValid: boolean) => <p>{isValid ? 'Valid' : 'Invalid'}</p>
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, card: ICard) => (
        <>
          <Button type="link" onClick={() => onEdit(card)}>
            Edit
          </Button>
        </>
      ),
    },
  ];
  useEffect(() => {
    cardStore.getCards()
  }, [])

  return <div style={{ margin: 20 }} >
    <Button type="primary" style={{ margin: 20 }} onClick={() => setIsModalVisible(true)}>Add</Button>
    <Table rowKey="id" columns={columns} dataSource={cardStore.cards} />
    <Modal
      title="Add Card"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      width={600}
    >
      <Form form={cardForm} onFinish={onSave} labelCol={{
        span: 6,
      }}
        wrapperCol={{
          span: 18,
        }}>
        <Form.Item label="Card Number" name="cardNumber" rules={[
          {
            required: true,
            message: "Please input your card number!",
            min: 16,
            max: 16
          },
        ]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Is Valid" name="isValid" valuePropName="checked">
          <Checkbox defaultChecked></Checkbox>
        </Form.Item>
        <Form.Item label="State" name="state" rules={[
          {
            required: true,
            message: "Please input your state!",
          },
        ]}>
          <Select>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
            <Select.Option value="Disabled">Disabled</Select.Option>
            <Select.Option value="Expired">Expired</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[
          {
            required: true,
            message: "Please input your type!",
          },
        ]}>
          <Select onChange={onChangeType}>
            <Select.Option value="Forint">Forint</Select.Option>
            <Select.Option value="Currency">Currency</Select.Option>
            <Select.Option value="Credit">Expired</Select.Option>
          </Select>
        </Form.Item>
        {isCurrencyVisible && <Form.Item label="Currency" name="currency" rules={[
          {
            required: true,
            message: "Please input your currency!",
          },
        ]}>
          <Select >
            <Select.Option value="EUR">EUR</Select.Option>
            <Select.Option value="USD">USD</Select.Option>
          </Select>
        </Form.Item>}
        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal></div>;
};

export default observer(Cards);
