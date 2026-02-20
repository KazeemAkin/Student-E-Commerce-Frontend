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

export default function SubjectTable({
  subjects,
  confirmDisableSelected,
  goToUpdateSubjectScreen,
  goToDeleteSubjectScreen,
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedSubject, setSelectedSubject] = useState(null);

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
        severity={getSeverity(
          !empty(rowData) && !empty(rowData.active) ? rowData.active : false
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
      <span className="p-input-icon-left" 
          style={{ width: '100%' }}>
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e)}
          placeholder="Subject Search"
          className="table-search"
        />
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
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
          onClick={() => goToUpdateSubjectScreen(rowData)}
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
        <Button
          icon="pi pi-trash"
          style={{
            backgroundColor: "transparent",
            color: "#e65061",
            borderColor: "#e65061",
            borderWidth: 1,
            borderRadius: "50%",
          }}
          onClick={() => goToDeleteSubjectScreen(rowData)}
        />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={subjects}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedSubject}
        onSelectionChange={(e) => setSelectedSubject(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No subjects found."
        tableStyle={{ minWidth: "100%" }}
      >
        <Column
          field="title"
          header="Title"
          sortable
          filterPlaceholder="Search"
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="code"
          header="Code"
          sortable
          filterPlaceholder="Search"
          style={{ width: "20%" }}
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
