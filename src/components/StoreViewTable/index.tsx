import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./store-view-table.css";

const StoreViewTable: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>First Name</td>
          <td>{user.firstName}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>{user.lastName}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{user.email}</td>
        </tr>
        <tr>
          <td>Message</td>
          <td>{user.message}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StoreViewTable;
