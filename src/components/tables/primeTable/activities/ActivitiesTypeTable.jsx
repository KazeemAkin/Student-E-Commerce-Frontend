import React, { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../schools/SchoolsTable.css";
import { empty } from "../../../../Utilities/utils";

export default function ActivitiesTypeTable({
  activityTypes,
  goToUpdateActivityTypeScreen,
  goToDeleteActivityTypeScreen,
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedActivityType, setSelectedActivityType] = useState(null);

  const titleBodyTemplate = (rowData) => {
    const title =
      !empty(rowData) && !empty(rowData.title)
        ? rowData.title
        : "";
    return <span>{title}</span>;
  };

  const iconBodyTemplate = (rowData) => {
    const icon =
      !empty(rowData) && !empty(rowData.icon)
        ? rowData.icon
        : "";
    const iconColor = rowData?.color || '';

    return <i className={`pi ${icon} fs-20`} style={{ color: iconColor }}></i>;
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
      <span className="p-input-icon-left">
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e)}
          placeholder="Activity Type Search"
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
          onClick={() => goToUpdateActivityTypeScreen(rowData)}
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
          onClick={() => goToDeleteActivityTypeScreen(rowData)}
        />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={activityTypes}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedActivityType}
        onSelectionChange={(e) => setSelectedActivityType(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No activity types found."
        tableStyle={{ minWidth: "100%" }}
      >
        <Column
          field="title"
          header="Title"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
          body={titleBodyTemplate}
        ></Column>
        <Column
          field="nature"
          header="Nature"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
        ></Column>
        <Column
          field="icon"
          header="Icon"
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
          body={iconBodyTemplate}
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
