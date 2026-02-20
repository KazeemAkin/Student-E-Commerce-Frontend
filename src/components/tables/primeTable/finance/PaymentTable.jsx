import React, { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "../schools/SchoolsTable.css";
import { empty, formatDateToCustom, toAmountFormat } from "../../../../Utilities/utils";
import { NavLink } from "react-router-dom";
import colors from "../../../../config/colors";

const filterValues = [
  { id: 1, value: "Completed", color: 'success' },
  { id: 2, value: "Cancelled", color: 'danger' },
  { id: 3, value: "Pending", color: 'orange' }
];

export default function PaymentTable({
  paymentHistories,
  onPageChange,
  rows = 50,
  totalRecords,
  first,
  search = "",
  onSearchChange,
  onKeyDown,
  filterValue,
  filterSearch,
  showFilter = true, 
  currency
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [activeIndex, setActiveIndex] = useState(filterValue);

  const renderHeader = () => {
    return (
      <div style={{ width: "100%"}}>
        <InputText
          value={search}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          placeholder="Payment Search"
          className="table-search"
        />
        <div className="flex row-g-12 col-g-12 flex-wrap mt-20">
          {showFilter && filterValues.map((data, index) => (
            <div
              key={data.id}
              className="subject-assessment-box"
              style={{
                color: activeIndex === index + 1 ? colors.white : colors.black,
                backgroundColor: activeIndex === index + 1 ? colors[data.color] : 'transparent',
                borderColor: colors[data.color],
              }}
              onClick={() => {
                filterSearch(data.value);
                setActiveIndex(index + 1)
              }}
            >
              {data.value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const invoiceIdBodyTemplate = (rowData) => {
    const invoiceId = !empty(rowData) && !empty(rowData.invoiceId) ? rowData.invoiceId : "";
    return (
      <NavLink
        to={`/finance/invoice/${invoiceId}`}
        style={{ color: colors.primary, textDecoration: "none" }}
      >
        {invoiceId}
      </NavLink>
    );
  };

  const paymentStatusTemplate = (rowData) => {
    return (
      <Tag
        value={rowData?.status || 'N/A'}
        severity={rowData?.status?.toLowerCase() === 'completed' ? 'success' : rowData?.status?.toLowerCase() === 'pending' ? 'warning' : rowData?.status?.toLowerCase() === 'cancelled' ? 'danger' : 'secondary'
        }
      />
    );
  };

  const paymentCompletedType = (rowData) => {
    return (
      <Tag
        value={rowData?.paymentCompleted === true ? "Completed" : 'Installment'}
        severity={rowData?.paymentCompleted === true ? 'success' : 'danger'}
      />
    );
  };

  const paymentDateTemplate = (rowData) => {
    const date = formatDateToCustom(rowData?.paymentDate, false) || '--';
    return (
      <div>{date}</div>
    );
  };

  const amountPaidTemplate = (rowData) => {
    const amount = toAmountFormat(rowData?.amountPaid) || 'N/A';
    return (
      <div>{currency || ''}{amount}</div>
    );
  };

  const header = renderHeader();
  return (
    <div className="datatable">
      <DataTable
        value={paymentHistories}
        paginator
        rows={rows}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No payment detail found."
        tableStyle={{ minWidth: "100%" }}
        onPage={onPageChange}
        lazy={true}
        totalRecords={totalRecords}
        first={first}
      >
        <Column
          field="invoiceId"
          header="Invoice Id."
          sortable
          style={{ width: "20%" }}
          body={invoiceIdBodyTemplate}
        />
        <Column
          field="studentFullName"
          header="Student"
          sortable
          style={{ width: "25%" }}
        />
        <Column
          field="amountPaid"
          header="Amount Paid"
          sortable
          style={{ width: "15%" }}
          body={amountPaidTemplate}
        />
        <Column
          field="status"
          header="Payment Status"
          sortable
          style={{ width: "10%" }}
          body={paymentStatusTemplate}
        />
        <Column
          field="type"
          header="Payment Type"
          sortable
          style={{ width: "10%" }}
        />
        <Column
          field="paymentCompleted"
          header="Fee Status"
          sortable
          style={{ width: "5%" }}
          body={paymentCompletedType}
        />
        <Column
          field="paymentDate"
          header="Date"
          sortable
          style={{ width: "15%" }}
          body={paymentDateTemplate}
        />
      </DataTable>
    </div>
  );
}
