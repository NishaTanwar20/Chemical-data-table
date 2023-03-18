const createCheckbox = (rowId) => {
  const checkbox = document.createElement("input");

  checkbox.setAttribute("type", "checkbox");
  checkbox.id = rowId;

  if (rowId === "all") {
    checkbox.checked = Object.keys(selectedRows).length === data.length;
    checkbox.addEventListener("click", toggleAllRows);
  } else {
    checkbox.checked = selectedRows[rowId];
    checkbox.addEventListener("click", () => toggleRow(rowId));
  }

  return checkbox;
};

const openAddNewForm = () => {
  let modalEle = new bootstrap.Modal(document.getElementById("editOrAddModal"));
  modalEle.show();

  // clear all form values
  formFields.forEach((item) => {
    item.forEach(({ label }) => {
      const ele = document.getElementById(label);
      ele.value = "";
    });
  });

  // update modal title
  const titleEle = document.getElementById("editOrAddModalLabel");
  titleEle.innerHTML = "Add";

  // update modal save button text
  const saveBtnEle = document.getElementById("save");
  saveBtnEle.innerHTML = "Add";

  // clear modalRowDetails
  modalRowDetails = null;
};

const createEditButton = (rowDetails) => {
  const editBtnEle = document.createElement("button");
  editBtnEle.setAttribute("type", "button");
  editBtnEle.classList = "btn btn-outline-primary btn-sm";
  editBtnEle.innerHTML = "Edit";
  editBtnEle.addEventListener("click", () => editRow(rowDetails));

  return editBtnEle;
};

const getSortOrder = () => {
  if (sortedColumn?.sortOrder) {
    if (sortedColumn?.sortOrder === "asc") {
      return "desc";
    }
    return "asc";
  }
  return "asc";
};

const sortColumn = (columnId) => {
  sortedColumn = { columnId, sortOrder: getSortOrder() };
  handleSort();
};

// function to create table header row
const createTableHead = () => {
  const tableHeadEle = document.getElementById("tableHead");

  const tableHeadRow = document.createElement("tr");

  columns.forEach((column, index) => {
    const tableHeadCell = document.createElement("th");

    if (index === 0) {
      tableHeadCell.append(createCheckbox("all"));
    } else {
      tableHeadCell.innerHTML = `${column}`;
      tableHeadCell.addEventListener("click", () => sortColumn(column));
    }

    // <i class="fa-regular fa-arrow-down-short-wide"></i>
    // <i class="fa-regular fa-arrow-up-wide-short"></i>

    tableHeadCell.classList = "fs-6 fw-semibold";
    tableHeadCell.setAttribute("scope", "col");
    tableHeadRow.append(tableHeadCell);
  });

  tableHeadEle.append(tableHeadRow);
};

// function to create table body row
const createTableBodyRow = (rowDetails) => {
  const tableBodyEle = document.getElementById("tableBody");

  const tableBodyRow = document.createElement("tr");
  tableBodyRow.id = `row_${rowDetails.Id}`;

  columns.forEach((column, index) => {
    const tableRowCell = document.createElement("th");

    switch (column) {
      case "selectAll":
        tableRowCell.append(createCheckbox(rowDetails.Id));
        break;

      case "Edit Row":
        tableRowCell.append(createEditButton(rowDetails));
        break;

      default:
        tableRowCell.innerHTML = rowDetails[column];
        break;
    }

    tableRowCell.classList = "fs-6 fw-semibold";
    tableRowCell.setAttribute("scope", "col");
    tableBodyRow.append(tableRowCell);
  });

  tableBodyEle.append(tableBodyRow);
};

//function to create table
const createTable = () => {
  document.getElementById("tableHead").innerHTML = "";
  document.getElementById("tableBody").innerHTML = "";

  createTableHead();

  data.forEach((item) => {
    createTableBodyRow(item);
  });
};

const createColumn = (value, type) => {
  const col = document.createElement("div");
  col.classList = "col-md-6";

  const label = document.createElement("label");
  label.setAttribute("for", value);
  label.classList = "form-label fs-6";
  label.innerHTML = value;

  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.classList = "form-control";
  input.id = value;

  col.append(label);
  col.append(input);

  return col;
};

const createForm = () => {
  const form = document.getElementById("form");

  formFields.forEach((item) => {
    const row = document.createElement("div");
    row.classList = "row";
    row.style = "text-align:start";

    item.forEach(({ label, type }) => {
      row.append(createColumn(label, type));
    });

    form.append(row);
  });
};

createForm();
createTable();
