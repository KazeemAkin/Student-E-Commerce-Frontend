import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../schools/SchoolsTable.css";
import { Tag } from "primereact/tag";
import colors from "../../../../config/colors";

export default function BankAccountsTable({
  bankAccounts = [],
  goToUpdateBankAccountScreen,
  goToDeleteBankAccountScreen,
  goToToggleBankAccountScreen
}) {
  const [selectedBankAccounts, setSelectedBankAccounts] = useState(null);

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", gap: 15 }}>
        <Button
          icon={rowData?.active ? "pi pi-times" : "pi pi-check"}
          style={{
            backgroundColor: "transparent",
            color: rowData?.active ? colors.danger : colors.success,
            borderColor: rowData?.active ? colors.danger : colors.success,
            borderWidth: 1,
            borderRadius: "50%",
            width: 40,
            height: 40
          }}
          onClick={() => goToToggleBankAccountScreen(rowData)}
          title="Activate account"
        />
        <Button
          icon="pi pi-pencil"
          style={{
            backgroundColor: "transparent",
            color: "#633ccd",
            borderColor: "#633ccd",
            borderWidth: 1,
            borderRadius: "50%",
            width: 40,
            height: 40
          }}
          onClick={() => goToUpdateBankAccountScreen(rowData)}
          title="Edit account"
        />
        <Button
          icon="pi pi-trash"
          style={{
            backgroundColor: "transparent",
            color: "#e65061",
            borderColor: "#e65061",
            borderWidth: 1,
            borderRadius: "50%",
            width: 40,
            height: 40
          }}
          onClick={() => goToDeleteBankAccountScreen(rowData)}
          title="Delete account"
        />
      </div>
    );
  };


  const activeBodyTemplate = (rowData) => {
    console.log({ rowData });
    return (
      <Tag
        value={Boolean(rowData?.active) === true
            ? 'Active' : 'In-active'}
        style={{
          backgroundColor: Boolean(rowData?.active) === true
            ? colors.success : colors.danger
        }}
      />
    );
  };

  return (
    <div className="datatable">
      <DataTable
        value={bankAccounts}
        selection={selectedBankAccounts}
        onSelectionChange={(e) => setSelectedBankAccounts(e.value)}
        selectionMode="single"
        dataKey="id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No bank account found."
        tableStyle={{ minWidth: "100%" }}
        lazy={true}
      >
        <Column
          field="name"
          header="Bank Name"
          sortable
          filterPlaceholder="Search"
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="accountName"
          header="Account Name"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
        ></Column>
        <Column
          field="accountNumber"
          header="Account Number"
          sortable
          filterPlaceholder="Search"
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="active"
          header="Status"
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
          body={activeBodyTemplate}
        />
        <Column
          header="Action"
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "15%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
