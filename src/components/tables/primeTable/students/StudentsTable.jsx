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
import { empty, isArray } from "../../../../Utilities/utils";
import { NavLink, useNavigate } from "react-router-dom";
import colors from "../../../../config/colors";
import { Checkbox } from "primereact/checkbox";
import { FaCheck } from "react-icons/fa";

const filterValues = [
  { id: 1, value: "Active" },
  { id: 2, value: "In-active" },
];

export default function StudentsTable({
  students = [],
  confirmDisableSelected,
  goToUpdateStudentScreen,
  getStudentReportScreen,
  onPageChange,
  rows = 50,
  totalRecords,
  first,
  search = "",
  onSearchChange,
  assessment = false,
  openAssessmentModal,
  openMultipleAssessmentModal,
  recordScores = false,
  reportSheet = false,
  isClassList = false,
  isPromotionList = false,
  goToActivateStudent,
  selectedStudentIds = [],
  setShowAddButton,
  setSelectedStudentIds,
  setChecked,
  updateSelectedStudentIds,
  checked,
  studentIds,
  promoteStudent,
  activateEmpty,
  graduationList = false,
  academicData = { termId: "", sessionId: "" },
  onKeyDown,
  filterValue,
  filterSearch,
  showFilter = true,
}) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeIndex, setActiveIndex] = useState(filterValue);

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

  // go to profile
  const goToProfile = (rowData) => {
    const studentId = !empty(rowData) && !empty(rowData._id) ? rowData._id : "";
    navigate(`/student/${studentId}/profile`);
  };

  const renderHeader = () => {
    return (
      <div style={{ width: "100%" }}>
        <InputText
          value={search}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          placeholder="Student Search"
          className="table-search"
        />
        {!assessment && (
          <div className="flex row-g-12 col-g-12 flex-wrap mt-20">
            {showFilter &&
              filterValues.map((data, index) => (
                <div
                  key={data.id}
                  className="subject-assessment-box"
                  style={{
                    color:
                      activeIndex === index + 1 ? colors.white : colors.black,
                    backgroundColor:
                      activeIndex === index + 1 ? colors.primary : colors.white,
                  }}
                  onClick={() => {
                    filterSearch(data.value);
                    setActiveIndex(index + 1);
                  }}
                >
                  {data.value}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    const hasPaid = rowData?.paid?.toLowerCase() === "yes" ? true : false;
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {assessment ? (
          <>
            {recordScores && (
              <>
                <Button
                  icon="pi pi-cloud-upload"
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: "transparent",
                    color: "#22C55E",
                    borderColor: "#22C55E",
                    borderWidth: 1,
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    openAssessmentModal(rowData, true);
                  }}
                />
                <Button
                  icon="pi pi-arrow-circle-up"
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: "transparent",
                    color: colors.primary,
                    borderColor: colors.primary,
                    borderWidth: 1,
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    openMultipleAssessmentModal(rowData, true);
                  }}
                />
              </>
            )}
            {reportSheet && (
              <Button
                icon="pi pi-id-card"
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: "transparent",
                  color: "#6366F1",
                  borderColor: "#6366F1",
                  borderWidth: 1,
                  borderRadius: "50%",
                }}
                onClick={() => getStudentReportScreen(rowData)}
              />
            )}
          </>
        ) : hasPaid && !isPromotionList ? (
          <>
            {/* go to profile */}
            <Button
              icon="pi pi-eye"
              style={{
                width: 35,
                height: 35,
                backgroundColor: "transparent",
                color: "#22C55E",
                borderColor: "#22C55E",
                borderWidth: 1,
                borderRadius: "50%",
              }}
              onClick={() => goToProfile(rowData)}
            />
            {/* go to update student */}
            <Button
              icon="pi pi-pencil"
              style={{
                width: 35,
                height: 35,
                backgroundColor: "transparent",
                color: "#633ccd",
                borderColor: "#633ccd",
                borderWidth: 1,
                borderRadius: "50%",
              }}
              onClick={() => goToUpdateStudentScreen(rowData)}
            />
            {/* toggle visibility */}
            <Button
              icon={
                !empty(rowData) &&
                !empty(rowData.active) &&
                rowData.active === true
                  ? "pi pi-times"
                  : "pi pi-check"
              }
              style={{
                backgroundColor: "transparent",
                width: 35,
                height: 35,
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
          </>
        ) : isPromotionList ? (
          // promote student
          <Button
            icon="pi pi-forward"
            style={{
              width: 35,
              height: 35,
              backgroundColor: "transparent",
              color: colors.primary,
              borderColor: colors.primary,
              borderWidth: 1,
              borderRadius: "50%",
            }}
            onClick={() => promoteStudent(rowData)}
          />
        ) : (
          // activate student
          <>
            <Button
              icon="pi pi-wallet"
              style={{
                width: 35,
                height: 35,
                backgroundColor: "transparent",
                color: colors.danger,
                borderColor: colors.danger,
                borderWidth: 1,
                borderRadius: "50%",
              }}
              onClick={() => goToActivateStudent(rowData)}
            />
            {/* toggle visibility */}
            <Button
              icon={
                !empty(rowData) &&
                !empty(rowData.active) &&
                rowData.active === true
                  ? "pi pi-times"
                  : "pi pi-check"
              }
              style={{
                backgroundColor: "transparent",
                width: 35,
                height: 35,
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
          </>
        )}
      </div>
    );
  };

  const checkBoxBodyTemplate = (rowData) => {
    const studentId = !empty(rowData) && !empty(rowData._id) ? rowData._id : "";
    const hasPaid =
      !empty(rowData) && !empty(rowData.paid) && rowData.paid === "Yes"
        ? true
        : false;
    if (hasPaid && !isPromotionList) {
      return <FaCheck color={colors.success} />;
    }
    return (
      <Checkbox
        checked={selectedStudentIds.includes(studentId)}
        onChange={() => {
          updateSelectedStudentIds(studentId);
        }}
      />
    );
  };

  const regNoBodyTemplate = (rowData) => {
    const regNo = !empty(rowData) && !empty(rowData.regNo) ? rowData.regNo : "";
    const studentId = !empty(rowData) && !empty(rowData._id) ? rowData._id : "";
    return (
      <NavLink
        to={`/student/${studentId}/profile`}
        style={{ color: colors.primary, textDecoration: "none" }}
      >
        {regNo}
      </NavLink>
    );
  };

  const recordedAssessmentTemplate = (rowData) => {
    const assessment = isArray(rowData?.assessment) ? rowData.assessment : [];
    const { sessionId, termId } = academicData;
    let currentAssessment = [];
    for (let i = 0; i < assessment.length; i++) {
      if (
        assessment?.[i]?.sessionId === sessionId &&
        assessment?.[i].termId === termId
      ) {
        currentAssessment.push(assessment[i]);
      }
    }

    let no_of_recorded_assessment = 0;
    currentAssessment.forEach((data) => {
      if (data?.ca1 !== "" && data?.ca2 !== "" && data?.exam !== "") {
        no_of_recorded_assessment += 1;
      }
    });

    return <span>{no_of_recorded_assessment}</span>;
  };

  const header = renderHeader();
  // render checkbox column
  const renderxCheckbox =
    (isClassList && !activateEmpty) || isPromotionList ? true : false;
  return (
    <div className="datatable">
      <DataTable
        value={students}
        paginator
        rows={rows}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedStudent}
        onSelectionChange={(e) => setSelectedStudent(e.value)}
        selectionMode="single"
        dataKey="_id"
        stateStorage="session"
        stateKey="dt-state-demo-local"
        emptyMessage="No students found."
        tableStyle={{ minWidth: "100%" }}
        onPage={onPageChange}
        lazy={true}
        totalRecords={totalRecords}
        first={first}
      >
        {renderxCheckbox && !graduationList ? (
          <Column
            field="_id"
            header={
              <Checkbox
                checked={
                  studentIds.length > 0 &&
                  studentIds.every((id) => selectedStudentIds.includes(id))
                }
                indeterminate={
                  studentIds.length > 0 &&
                  selectedStudentIds.some((id) => studentIds.includes(id)) &&
                  !studentIds.every((id) => selectedStudentIds.includes(id))
                    ? true
                    : undefined
                }
                onChange={(e) => {
                  const checked = e.checked;

                  setSelectedStudentIds((prev) => {
                    let newSelection = [];

                    if (checked) {
                      // Add all IDs from current page (preserve others)
                      const idsToAdd = studentIds.filter(
                        (id) => !prev.includes(id)
                      );
                      newSelection = [...prev, ...idsToAdd];
                    } else {
                      // Remove all IDs from current page
                      newSelection = prev.filter(
                        (id) => !studentIds.includes(id)
                      );
                    }

                    // Update related states
                    setShowAddButton(newSelection.length > 0);
                    setChecked(newSelection.length === totalRecords); // optional: true only if ALL students selected

                    return newSelection;
                  });
                }}
              />
            }
            style={{ width: "5%" }}
            body={checkBoxBodyTemplate}
          />
        ) : null}
        <Column
          field="regNo"
          header="Reg. No."
          sortable
          filterPlaceholder="Search"
          style={{ width: "10%" }}
          body={regNoBodyTemplate}
        ></Column>
        <Column
          field="lastName"
          header="Last Name"
          sortable
          filterPlaceholder="Search"
          style={{ width: "15%" }}
          body={(rowData) => rowData.lastName}
        ></Column>
        <Column
          field="firstName"
          header="First Name"
          sortable
          filterPlaceholder="Search"
          style={{ width: "15%" }}
          body={(rowData) => rowData.firstName}
        ></Column>
        <Column
          field="middleName"
          header="Middle Name"
          sortable
          filterPlaceholder="Middle name"
          style={{ width: "15%" }}
          body={(rowData) => rowData.middleName}
        ></Column>
        {assessment ? (
          <Column
            field="no_of_recorded_assessment"
            header="#Recorded Assessment"
            sortable
            filterPlaceholder="Recorded Assessment"
            style={{ width: "15%" }}
            body={recordedAssessmentTemplate}
          ></Column>
        ) : null}
        {!isClassList && !graduationList ? (
          <Column
            field="class"
            header="Class"
            sortable
            filterPlaceholder="Class"
            style={{ width: "15%" }}
            body={(rowData) => rowData?.class || "N/A"}
          ></Column>
        ) : null}
        {!graduationList && (
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            sortable
            filterMenuStyle={{ width: "14rem" }}
            style={{ width: "10%" }}
          ></Column>
        )}
        {!graduationList && (
          <Column
            header="Action"
            body={actionBodyTemplate}
            exportable={false}
            style={{ width: "15%" }}
          ></Column>
        )}
      </DataTable>
    </div>
  );
}
