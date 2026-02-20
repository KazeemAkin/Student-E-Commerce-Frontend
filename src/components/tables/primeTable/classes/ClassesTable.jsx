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

export default function ClassesTable({
  classes,
  confirmDisableSelected,
  goToUpdateClassScreen,
  goToDeleteClassScreen,
}) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedClass, setSelectedClass] = useState(null);

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

  const goToProfile = (rowData) => {
    const classId = !empty(rowData) && !empty(rowData._id) ? rowData._id : "";
    navigate(`/classes/${classId}/profile`);
  };

  const goToClassStudents = (rowData) => {
    const classId = !empty(rowData) && !empty(rowData._id) ? rowData._id : "";
    navigate(`/students/class/${classId}`);
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
          icon="pi pi-users"
          style={{
            backgroundColor: "transparent",
            color: "#633ccd",
            borderColor: "#633ccd",
            borderWidth: 1,
            borderRadius: "50%",
            width: 30,
            height: 30,
          }}
          title="Students"
          onClick={() => goToClassStudents(rowData)}
        />
        <Button
          icon="pi pi-eye"
          style={{
            backgroundColor: "transparent",
            color: "#633ccd",
            borderColor: "#633ccd",
            borderWidth: 1,
            borderRadius: "50%",
            width: 30,
            height: 30,
          }}
          title="View Details"
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
            width: 30,
            height: 30,
          }}
          title="Update Class"
          onClick={() => goToUpdateClassScreen(rowData)}
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
            width: 30,
            height: 30,
          }}
          title={rowData.active === true ? "Disable class" : "Enable Class"}
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
            width: 30,
            height: 30,
          }}
          title="Delete Class"
          onClick={() => goToDeleteClassScreen(rowData)}
        />
      </div>
    );
  };
  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={classes}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedClass}
        onSelectionChange={(e) => setSelectedClass(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No class(es) found."
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
          field="status"
          header="Status"
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
