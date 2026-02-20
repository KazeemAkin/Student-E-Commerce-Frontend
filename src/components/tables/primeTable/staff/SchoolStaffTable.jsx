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

export default function SchoolStaffTable({
  schoolStaff,
  confirmDisableSelected,
  goToUpdateStaffScreen,
}) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedStaff, setSelectedStaff] = useState(null);

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
        value={rowData.active ? "ACTIVE" : "IN-ACTIVE"}
        severity={getSeverity(rowData.active)}
      />
    );
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };

  const goToProfile = (rowData) => {
    const staffId = !empty(rowData) && !empty(rowData._id) ? rowData._id : "";
    navigate(`/staff/${staffId}/profile`);
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
          placeholder="Staff Search"
          className="table-search"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          icon="pi pi-eye"
          style={{
            backgroundColor: "transparent",
            color: "#22C55E",
            borderColor: "#22C55E",
            borderWidth: 1,
            width: 30,
            height: 30,
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
            width: 30,
            height: 30,
            borderRadius: "50%",
          }}
          onClick={() => goToUpdateStaffScreen(rowData)}
        />
        <Button
          icon={
            !empty(rowData) && !empty(rowData.active) && rowData.active === true
              ? "pi pi-times"
              : "pi pi-check"
          }
          style={{
            backgroundColor: "transparent",
            color:
              !empty(rowData) &&
              !empty(rowData?.active) &&
              rowData?.active === true
                ? "#e65061"
                : "#389d17",
            borderColor:
              !empty(rowData) &&
              !empty(rowData?.active) &&
              rowData?.active === true
                ? "#e65061"
                : "#389d17",
            borderWidth: 1,
            borderRadius: "50%",
            width: 30,
            height: 30,
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
        value={schoolStaff}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedStaff}
        onSelectionChange={(e) => setSelectedStaff(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No staff(s) found."
        tableStyle={{ minWidth: "100%" }}
      >
        <Column
          field="regNo"
          header="Reg. No."
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="title"
          header="Title"
          sortable
          filterPlaceholder="Search"
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="lastName"
          header="Last Name"
          sortable
          filterPlaceholder="Search"
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="firstName"
          header="First Name"
          sortable
          filterPlaceholder="Search"
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="middleName"
          header="Middle Name"
          sortable
          filterPlaceholder="Search"
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="stateOfOrigin"
          // body={nameBodyTemplate}
          header="State of Origin"
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          style={{ width: "15%" }}
        ></Column>
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
