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
import { Tag } from "primereact/tag";
import colors from "../../../../config/colors";

export default function FeeCategoriesTable({
  feeCategories,
  goToUpdateFeeCategoriesScreen,
  goToDeleteFeeCategoriesScreen,
  onKeyDown,
  search = "",
  onSearchChange,
  onPageChange,
  first,
  totalRecords
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedFeeCategories, setSelectedFeeCategories] = useState(null);

  const titleBodyTemplate = (rowData) => {
    const title =
      !empty(rowData) && !empty(rowData.title)
        ? rowData.title
        : "";
    return <span>{title}</span>;
  };

  const renderHeader = () => {
    return (
      <div style={{ width: "100%"}}>
        <InputText
          value={search}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          placeholder="Student Fee Category"
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
          onClick={() => goToUpdateFeeCategoriesScreen(rowData)}
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
          onClick={() => goToDeleteFeeCategoriesScreen(rowData)}
        />
      </div>
    );
  };


  const activeBodyTemplate = (rowData) => {
    return (
      <Tag
        value={String(rowData?.active).toLowerCase() === 'yes'
            ? 'Active' : 'In-active'}
        style={{
          backgroundColor: String(rowData?.active).toLowerCase() === 'yes'
            ? colors.success : colors.danger
        }}
      />
    );
  };

  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={feeCategories}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedFeeCategories}
        onSelectionChange={(e) => setSelectedFeeCategories(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No fee categories found."
        tableStyle={{ minWidth: "100%" }}
        onPage={onPageChange}
        totalRecords={totalRecords}
        first={first}
        lazy={true}
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
          field="active"
          header="Status"
          sortable
          filterPlaceholder="Search"
          style={{ width: "30%" }}
          body={activeBodyTemplate}
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
