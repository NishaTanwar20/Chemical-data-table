# Chemical-data-table
This web application displays a table of chemicals with their details such as id, chemical name, vendor, density, viscosity, packaging, pack size, unit, and quantity. The user can sort the data in ascending or descending order by clicking on any column header. The left top toolbar contains various functionalities such as adding a row, moving rows up or down, deleting a row, refreshing the data, and saving the data.

Design Approach:
To develop this web application, I have used HTML, CSS, and JavaScript without using any external frameworks or libraries. For styling, I have used Bootstrap CSS, which is included in the local repository.

The chemical data is stored in a JSON array that contains 15 rows with randomly generated data. I have created a function to display this data in a table format. The table headers and rows are dynamically created using JavaScript.

For the sorting functionality, I have added event listeners to each column header, which triggers a sorting function that uses the Array.sort() method to sort the data based on the clicked column header. The sorting function also toggles between ascending and descending order on each click.

For the edit functionality, I have added an edit button for each row that opens a modal window containing a form. The form is pre-filled with the row data and allows the user to edit any field. On submitting the form, the row data is updated in the table.

To save the data, I have added a save button in the toolbar that converts the table data into a JSON string and saves it to the local storage. On refreshing the page, the saved data is retrieved from the local storage and displayed in the table.
