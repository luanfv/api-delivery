interface IClient {
  id: string;
  username: string;
  password: string;
}

interface IDeliveryman {
  id: string;
  username: string;
  password: string;
}

interface IDelivery {
  id: string;
  id_client: string;
  id_deliveryman: string | null;
  item_name: string;
  created_at: Date;
  end_at: Date | null;
}

export { IClient, IDelivery, IDeliveryman };
