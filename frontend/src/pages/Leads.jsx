import { useEffect, useState } from "react";
import api from "../api/axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Leads() {
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    api.get(`/leads?page=${pagination.page}&limit=10`)
      .then(res => {
        setRowData(res.data.data);
        setPagination({ ...pagination, totalPages: res.data.totalPages });
      });
  }, [pagination.page]);

  const columns = [
    { headerName: "Id", field: "id"},
    { headerName: "First Name", field: "first_name" },
    { headerName: "Last Name", field: "last_name" },
    { headerName: "Email", field: "email" },
    { headerName: "Phone No", field: "phone"},
    { headerName: "Company", field: "company" },
    { headerName: "City", field: "city" },
    { headerName: "State", field: "state" },
    { headerName: "Source", field: "source" },
    { headerName: "Status", field: "status"},
    { headerName: "Score", field: "score" },
    { headerName: "Lead Value", field: "lead_value" },
    { headerName: "Last Acitivity AT", field: "city" },
    { headerName: "Is_Qualified", field: "is_qualified"},
    { headerName: "Created AT", field: "created_at" },
    { headerName: "Updated AT", field: "updated_at" },
    
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact rowData={rowData.map((val)=>{
        return {
          ...val,
          is_qualified: `${val.is_qualified}`
        }
      })} columnDefs={columns} />
      <button disabled={pagination.page === 1} onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}>Prev</button>
      <span> Page {pagination.page} / {pagination.totalPages} </span>
      <button disabled={pagination.page === pagination.totalPages} onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}>Next</button>
    </div>
  );
}
