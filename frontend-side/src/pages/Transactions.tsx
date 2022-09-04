import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ITransactions, IVendor } from "../models/Transaction";
import { useStore } from "../store";

const Transactions = () => {
  const { transactionStore } = useStore();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render:(value:number,card:ITransactions,index:number) =><p>{index+1}</p>
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Card Number",
      dataIndex: "cardNumber",
      key: "cardNumber",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor",
      key: "vendor",
      render: (cell: IVendor) => <p>{cell.name}</p>
    },
  ];

  useEffect(() => {
    transactionStore.getTransactions()
  }, [])

  return (
    <div style={{ margin: 20 }} >
      <Table rowKey="id" columns={columns} dataSource={transactionStore.transactions} />
    </div>
  );
};

export default observer(Transactions);
