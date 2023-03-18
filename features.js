const addNewRow = (formValues) => {
  const dataLength = data.length;
  const rowDetails = {
    Id: dataLength + 1,
    "Chemical Name": formValues["Chemical Name"],
    Vendor: formValues["Vendor"],
    Density: formValues["Density"],
    Viscosity: formValues["Viscosity"],
    Packaging: formValues["Packaging"],
    "Pack Size": formValues["Pack Size"],
    Unit: formValues["Unit"],
    Quantity: formValues["Quantity"],
  };

  data.push(rowDetails);

  createTableBodyRow(rowDetails);
};

const toggleAllRows = () => {
  const checkboxEle = document.getElementById("all");

  const selectedRowsCopy = { ...selectedRows };
  const dataCopy = [...data];

  if (Object.keys(selectedRowsCopy).length === dataCopy.length) {
    selectedRows = {};
    checkboxEle.checked = false;
    data.forEach((item) => {
      const rowCheckboxEle = document.getElementById(item.Id);
      rowCheckboxEle.checked = false;
    });
  } else {
    data.forEach((item) => {
      selectedRows[item.Id] = true;
      const rowCheckboxEle = document.getElementById(item.Id);
      rowCheckboxEle.checked = true;
    });
    checkboxEle.checked = true;
  }
};

const toggleRow = (rowId) => {
  const rowCheckboxEle = document.getElementById(rowId);

  if (selectedRows[rowId]) {
    delete selectedRows[rowId];
    rowCheckboxEle.checked = false;
  } else {
    selectedRows[rowId] = true;
    rowCheckboxEle.checked = true;
  }
};

// delete row
const deleteSelected = () => {
  const dataCopy = [...data];
  const selectedRowsCopy = { ...selectedRows };

  data = dataCopy.filter((item) => !selectedRows[item.Id]);

  Object.keys(selectedRowsCopy).forEach((item) => {
    document.getElementById(`row_${item}`).remove();
  });

  selectedRows = {};
};

// refresh table
const refreshTable = () => {
  data = [...rawData];
  selectedRows = {};

  createTable();
};

// save table data

// move rows - up and down
const moveRows = (direction) => {
  const dataCopy = direction === "up" ? [...data] : [...data.reverse()];
  let newData = [];

  let prevRow = null;
  dataCopy.forEach((item, index) => {
    if (selectedRows[item.Id] && prevRow) {
      newData[index] = prevRow;
      newData[index - 1] = item;
    } else {
      newData.push(item);
      prevRow = item;
    }
  });

  if (direction === "up") {
    data = Object.values(newData);
  } else {
    data = Object.values(newData).reverse();
  }

  createTable();
};

// edit row
const editRow = (rowDetails) => {
  let modalEle = new bootstrap.Modal(document.getElementById("editOrAddModal"));
  modalEle.show();

  formFields.forEach((item) => {
    item.forEach(({ label }) => {
      const ele = document.getElementById(label);

      ele.value = rowDetails[label];
    });
  });
  modalRowDetails = rowDetails;
};

const handleSave = () => {
  const formValues = {};

  // extract form values
  formFields.forEach((item) => {
    item.forEach(({ label }) => {
      const ele = document.getElementById(label);
      formValues[label] = ele.value;
    });
  });

  // update/add data
  const dataCopy = [...data];

  if (modalRowDetails) {
    dataCopy.forEach((item, index) => {
      if (item.Id === modalRowDetails.Id) {
        dataCopy[index] = { ...item, ...formValues };
      }
    });
    data = [...dataCopy];

    // create updated table
    createTable();
  } else {
    addNewRow(formValues);
  }

  // hide modal
  let modalEle = new bootstrap.Modal(document.getElementById("editOrAddModal"));
  modalEle.hide();
};

// sorting
const handleSort = () => {
  const dataCopy = [...data];

  const { columnId, sortOrder } = sortedColumn;

  if (sortOrder === "asc") {
    if (columnId === "Density" || columnId === "Viscosity" || columnId === "Pack Size" || columnId === "Quantity") {
      dataCopy.sort((a, b) => parseFloat(a[columnId]) - parseFloat(b[columnId]));
    } else {
      dataCopy.sort((a, b) => (a[columnId] > b[columnId]) ? 1 : -1);
    }
  } else if (sortOrder === "desc") {
    if (columnId === "Density" || columnId === "Viscosity" || columnId === "Pack Size" || columnId === "Quantity") {
      dataCopy.sort((a, b) => parseFloat(b[columnId]) - parseFloat(a[columnId]));
    } else {
      dataCopy.sort((a, b) => (a[columnId] < b[columnId]) ? 1 : -1);
    }
  }

  data = [...dataCopy];

  createTable();
};

// save data
const saveData = () => {
  const jsonData = JSON.stringify(data);
  alert("Table data saved successfully.");
};

