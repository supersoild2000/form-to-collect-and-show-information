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
          <td data-testid="first-name">{user.firstName}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td data-testid="last-name">{user.lastName}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td data-testid="email">{user.email}</td>
        </tr>
        <tr>
          <td>Message</td>
          <td data-testid="message">{user.message}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default StoreViewTable;
