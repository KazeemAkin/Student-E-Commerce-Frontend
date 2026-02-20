import React, { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../schools/SchoolsTable.css";
import { empty, isArray } from "../../../../Utilities/utils";
import { Tag } from "primereact/tag";
import colors from "../../../../config/colors";

export default function ActivitiesTable({
  activities,
  goToUpdateActivitiesScreen,
  goToDeleteActivitiesScreen,
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedActivities, setSelectedActivities] = useState(null);

  const titleBodyTemplate = (rowData) => {
    const title =
      !empty(rowData) && !empty(rowData.title)
        ? rowData.title
        : "";
    return <span>{title}</span>;
  };

  const iconBodyTemplate = (rowData) => {
    const icon =
      !empty(rowData) && !empty(rowData.activityTypeIcon)
        ? rowData.activityTypeIcon
        : "";
    const iconColor = rowData?.activityTypeIconColor || '';
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
          placeholder="Activity Search"
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
          onClick={() => goToUpdateActivitiesScreen(rowData)}
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
          onClick={() => goToDeleteActivitiesScreen(rowData)}
        />
      </div>
    );
  };

  const participantBodyTemplate = (rowData) => {
    try {
      const types = isArray(rowData?.participantTypes) ? rowData.participantTypes.join(',') : 'All';

      return <span>{types}</span>;
    } catch (error) {
      
    }
  }


  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData?.status || 'Pending'}
        style={{
          backgroundColor: String(rowData?.status).toLowerCase() === 'pending'
            ? colors.orange : String(rowData?.status).toLowerCase() === 'completed'
              ? colors.success : String(rowData?.status).toLowerCase() === 'active'
                ? colors.primary : String(rowData?.status).toLowerCase() === 'cancelled'
                  ? colors.danger : colors.darkgray
        }}
      />
    );
  };

  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={activities}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedActivities}
        onSelectionChange={(e) => setSelectedActivities(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No activities found."
        tableStyle={{ minWidth: "100%" }}
      >
        <Column
          field="activityTypeIcon"
          header="Icon"
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
          body={iconBodyTemplate}
        ></Column>
        <Column
          field="title"
          header="Title"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
          body={titleBodyTemplate}
        ></Column>
        <Column
          field="activityTypeTitle"
          header="Activity Type"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
        ></Column>
        <Column
          field="participantTypes"
          header="Participant Types"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
          body={participantBodyTemplate}
        />
        <Column
          field="activityTypeNature"
          header="Nature"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
          body={statusBodyTemplate}
        />
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
