const columns = [
  "selectAll",
  "Id",
  "Chemical Name",
  "Vendor",
  "Density",
  "Viscosity",
  "Packaging",
  "Pack Size",
  "Unit",
  "Quantity",
  "Edit Row",
];

const formFields = [
  [
    { label: "Chemical Name", type: "text" },
    { label: "Vendor", type: "text" },
  ],
  [
    { label: "Density", type: "number" },
    { label: "Viscosity", type: "number" },
  ],
  [
    { label: "Packaging", type: "text" },
    { label: "Pack Size", type: "number" },
  ],
  [
    { label: "Unit", type: "text" },
    { label: "Quantity", type: "number" },
  ],
];

let data = [...rawData];

let selectedRows = {};
let sortedColumn = { columnId: "", sortOrder: "" };
let modalRowDetails = null;
