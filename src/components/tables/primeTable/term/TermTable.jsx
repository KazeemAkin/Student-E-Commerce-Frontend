import React, { useState } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../schools/SchoolsTable.css";
import { NavLink } from "react-router-dom";
import { empty } from "../../../../Utilities/utils";

export default function TermTable({ terms, confirmDisableSelected }) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });
  const [selectedTerm, setSelectedTerm] = useState(null);

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

  const nameBodyTemplate = (rowData) => {
    return (
      <NavLink to="" style={{ textDecoration: "none", color: "#000000" }}>
        {rowData.title}
      </NavLink>
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
          placeholder="Term Search"
          className="table-search"
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: "flex", gap: 15 }}>
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
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={terms}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedTerm}
        onSelectionChange={(e) => setSelectedTerm(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No term(s) found."
        tableStyle={{ minWidth: "100%" }}
      >
        <Column
          field="title"
          body={nameBodyTemplate}
          header="Term Title"
          sortable
          filterPlaceholder="Search"
          style={{ width: "50%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "25%" }}
        ></Column>
        <Column
          header="Action"
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
