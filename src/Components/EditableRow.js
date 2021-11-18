import React from "react";

const EditableRow = ({editFormData,handleEditFormChange,handleCancelClick,}) => {
    return (
        <tr>
            <td>
                <input type="text" name="Item" required="required" placeholder="Enter a item" value={editFormData.Item} onChange={handleEditFormChange}></input>
            </td>
            <td>
                <input type="text" name="Price" required="required" placeholder="Enter a Price" value={editFormData.Price} onChange={handleEditFormChange}></input>
            </td>
            <td>
                <input type="text" name="Quantity" required="required" placeholder="Enter a Quantity" value={editFormData.Quantity} onChange={handleEditFormChange}></input>
            </td>
        </tr>
    );
}

export default EditableRow;