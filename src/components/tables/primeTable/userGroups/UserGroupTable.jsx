import React, { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../schools/SchoolsTable.css";
import { empty, isString } from "../../../../Utilities/utils";

export default function UserGroupTable({
  userGroups,
  confirmDisableSelected,
  goToUpdateUserGroupScreen,
  goToDeleteUserGroupScreen,
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedUserGroup, setSelectedUserGroup] = useState(null);

  const getSeverity = (status) => {
    switch (status) {
      case false:
        return "danger";

      case true:
        return "success";
      default:
        return "danger";
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={
          !empty(rowData) &&
          !empty(rowData.active) &&
          isString(rowData.active) &&
          rowData.active.toLowerCase() === "yes"
            ? "ACTIVE"
            : "IN-ACTIVE"
        }
        severity={getSeverity(
          !empty(rowData) &&
            !empty(rowData.active) &&
            isString(rowData.active) &&
            rowData.active.toLowerCase() === "yes"
            ? true
            : false
        )}
      />
    );
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";
    return (
      <div className="p-input-icon-left" 
          style={{ width: '100%' }}>
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e)}
          placeholder="User Group Search"
          className="table-search"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    const active =
      !empty(rowData) &&
      !empty(rowData.active) &&
      isString(rowData.active) &&
      rowData.active.toLowerCase() === "yes";
    return (
      <div style={{ display: "flex", gap: 15 }}>
        <Button
          icon="pi pi-pencil"
          style={{
            backgroundColor: "transparent",
            color: "#633ccd",
            borderColor: "#633ccd",
            borderWidth: 1,
            borderRadius: "50%",
          }}
          onClick={() => goToUpdateUserGroupScreen(rowData)}
        />
        <Button
          icon={active ? "pi pi-times" : "pi pi-check"}
          style={{
            backgroundColor: "transparent",
            color: active ? "#e65061" : "#389d17",
            borderColor: active ? "#e65061" : "#389d17",
            borderWidth: 1,
            borderRadius: "50%",
          }}
          onClick={() => confirmDisableSelected(rowData)}
        />
        <Button
          icon="pi pi-trash"
          style={{
            backgroundColor: "transparent",
            color: "#e65061",
            borderColor: "#e65061",
            borderWidth: 1,
            borderRadius: "50%",
          }}
          onClick={() => goToDeleteUserGroupScreen(rowData)}
        />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={userGroups}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedUserGroup}
        onSelectionChange={(e) => setSelectedUserGroup(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No user group(s) found."
        tableStyle={{ minWidth: "50%" }}
      >
        <Column
          field="title"
          header="Title"
          sortable
          filterPlaceholder="Search"
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="active"
          header="Active"
          body={statusBodyTemplate}
          sortable
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "30%" }}
        ></Column>
        <Column
          header="Action"
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "30%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
