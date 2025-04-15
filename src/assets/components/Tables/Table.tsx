interface Customer {
  customer_name: string;
  customer_id: number;
  customer_ordered: string;
}

// Define the structure of props if needed in future
interface TableProps {
  data?: Customer[];
}

const Table: React.FC<TableProps> = ({ data = [] }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Customer Id</th>
            <th scope="col">Customer Ordered</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            <tr key={index}>
              <td>{customer.customer_name}</td>
              <td>{customer.customer_id}</td>
              <td>{customer.customer_ordered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
