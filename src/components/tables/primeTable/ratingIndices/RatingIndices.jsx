import React, { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../schools/SchoolsTable.css";

export default function RatingIndexTable({
  ratingIndices,
  goToUpdateRatingScreen,
  goToDeleteRatingScreen,
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedRating, setSelectedRating] = useState(null);

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
          placeholder="Class Search"
          className="table-search"
        />
      </div>
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
          onClick={() => goToUpdateRatingScreen(rowData)}
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
          onClick={() => goToDeleteRatingScreen(rowData)}
        />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={ratingIndices}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedRating}
        onSelectionChange={(e) => setSelectedRating(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No rating index found."
        tableStyle={{ minWidth: "100%" }}
      >
        <Column
          field="value"
          header="Value"
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="description"
          header="Description"
          sortable
          filterPlaceholder="Search"
          style={{ width: "50%" }}
        ></Column>
        <Column
          header="Action"
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "40%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
