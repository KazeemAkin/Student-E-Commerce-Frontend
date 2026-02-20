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
import { empty } from "../../../../Utilities/utils";
import { useNavigate } from "react-router-dom";

export default function ParentsTable({
  parents,
  confirmDisableSelected,
  goToUpdateParentScreen,
  onSearchChange,
  onKeyDown,
  totalRecords,
  onPageChange,
  first,
  rows,
  search
}) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedParent, setSelectedParent] = useState(null);

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
          !empty(rowData) && !empty(rowData.active) ? "ACTIVE" : "IN-ACTIVE"
        }
        severity={getSeverity(!empty(rowData) && rowData.active ? true : false)}
      />
    );
  };

  const fullNameBodyTemplate = (rowData) => {
    const firstName =
      !empty(rowData) && !empty(rowData.firstName) ? rowData.firstName : "";
    const LastName =
      !empty(rowData) && !empty(rowData.lastName) ? rowData.lastName : "";
    const fullName = `${LastName} ${firstName}`;
    return fullName;
  };

  // go to profile
  const goToProfile = (rowData) => {
    const parentId = !empty(rowData) && !empty(rowData._id) ? rowData._id : "";
    navigate(`/parent/${parentId}/profile`);
  };

  const renderHeader = () => {
    return (
      <div className="p-input-icon-left" 
          style={{ width: '100%' }}>
        <InputText
          type="search"
          value={search}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          placeholder="Parent Search"
          className="table-search"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", gap: 15 }}>
        {/* go to profile */}
        <Button
          icon="pi pi-eye"
          style={{
            backgroundColor: "transparent",
            color: "#22C55E",
            borderColor: "#22C55E",
            borderWidth: 1,
            borderRadius: "50%",
          }}
          onClick={() => goToProfile(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          style={{
            backgroundColor: "transparent",
            color: "#633ccd",
            borderColor: "#633ccd",
            borderWidth: 1,
            borderRadius: "50%",
          }}
          onClick={() => goToUpdateParentScreen(rowData)}
        />
        <Button
          icon={
            !empty(rowData) && rowData.active && rowData.active === true
              ? "pi pi-times"
              : "pi pi-check"
          }
          style={{
            backgroundColor: "transparent",
            color:
              !empty(rowData) &&
              !empty(rowData.active) &&
              rowData.active === true
                ? "#e65061"
                : "#389d17",
            borderColor:
              !empty(rowData) &&
              !empty(rowData.active) &&
              rowData.active === true
                ? "#e65061"
                : "#389d17",
            borderWidth: 1,
            borderRadius: "50%",
          }}
          onClick={() => confirmDisableSelected(rowData)}
        />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={parents}
        paginator
        rows={rows}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedParent}
        onSelectionChange={(e) => setSelectedParent(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No parents found."
        tableStyle={{ minWidth: "100%" }}
        onPage={onPageChange}
        lazy={true}
        totalRecords={totalRecords}
        first={first}
      >
        <Column
          field="title"
          header="Title"
          sortable
          filterPlaceholder="Search"
          style={{ width: "5%" }}
        ></Column>
        <Column
          field=""
          header="Name"
          sortable
          body={fullNameBodyTemplate}
          filterPlaceholder="Search"
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="maritalStatus"
          header="Marital Status"
          sortable
          filterPlaceholder="Search"
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "10%" }}
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
