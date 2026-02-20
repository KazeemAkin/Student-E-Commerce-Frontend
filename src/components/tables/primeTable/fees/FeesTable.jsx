import React, { useContext, useState } from "react";
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
import { AuthContext } from "../../../../screens/Root/ProtectedRoute";

export default function FeesTable({
  fees,
  goToUpdateFeeScreen,
  goToDeleteFeeScreen,
  onKeyDown,
  search = "",
  onSearchChange,
  onPageChange,
  first,
  totalRecords
}) {
  const { currency } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedFee, setSelectedFee] = useState(null);

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
            width: 30,
            height: 30,
          }}
          onClick={() => goToUpdateFeeScreen(rowData)}
        />
        <Button
          icon="pi pi-trash"
          style={{
            backgroundColor: "transparent",
            color: colors.danger,
            borderColor: colors.danger,
            borderWidth: 1,
            borderRadius: "50%",
            width: 30,
            height: 30
          }}
          onClick={() => goToDeleteFeeScreen(rowData)}
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

  const amountBodyTemplate = (rowData) => {
    const total = rowData?.totalFee <= 0 ? 'N/A' : rowData?.totalFee || 'N/A';
    return (
      <span>{ currency || ''}{total}</span>
    )
  }

  const header = renderHeader();

  return (
    <div className="datatable">
      <DataTable
        value={fees}
        paginator
        rows={20}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedFee}
        onSelectionChange={(e) => setSelectedFee(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No fee found."
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
        />
        <Column
          field="totalFee"
          header="Total Amount"
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
          body={amountBodyTemplate}
        />
        <Column
          field="term"
          header="Term"
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
        />
        <Column
          field="session"
          header="Session"
          sortable
          filterPlaceholder="Search"
          style={{ width: "5%" }}
        />
        <Column
          field="startDate"
          header="Start Date"
          sortable
          filterPlaceholder="Search"
          style={{ width: "15%" }}
        />
        <Column
          field="endDate"
          header="End Date"
          sortable
          filterPlaceholder="Search"
          style={{ width: "15%" }}
        />
        <Column
          field="active"
          header="Status"
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
          body={activeBodyTemplate}
        />
        <Column
          header="Action"
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "10%" }}
        />
      </DataTable>
    </div>
  );
}
