import { useEffect, useState } from "react";
import api from "../api/axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import "../index.css";


ModuleRegistry.registerModules([AllCommunityModule]);

export default function Leads() {

  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sourceFilter, setSourceFilter] = useState("All Resources");


  useEffect(() => {

    api.get(`/leads?page=${pagination.page}&limit=10`)
      .then(res => {
        setRowData(res.data.data);
        setPagination({ ...pagination, totalPages: res.data.totalPages });
      });
  }, [pagination.page]);


  const filteredRowData = rowData.filter(lead => {
    const term = search.toLowerCase();
    const matchesSearch = 
      lead.first_name.toLowerCase().includes(term) ||
      lead.last_name.toLowerCase().includes(term) ||
      lead.email.toLowerCase().includes(term) ||
      lead.phone.toLowerCase().includes(term);

    const matchesStatus = statusFilter === "All Status" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "All Resources" || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const columns = [
    { headerName: "Id",
      field: "id",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.id}</strong>
          <div className="id">{data.id}</div>
        </div>
      ),
    },

    { 
      headerName: "First Name", field: "first_name",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.first_name}</strong>
          <div className="first_name">{data.first_name}</div>
        </div>
      ),
     },

    { 
      headerName: "Last Name", field: "last_name",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.last_name}</strong>
          <div className="last_name">{data.last_name}</div>
        </div>
      ),
     },

    { headerName: "Email", field: "email",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.email} {data.email}</strong>
          <div className="email">{data.email}</div>
        </div>
      ),
     },

    { headerName: "Phone No", field: "phone",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.phone} {data.phone}</strong>
          <div className="phone">{data.phone}</div>
        </div>
      ),
    },

    { headerName: "Company", field: "company",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.company} {data.company}</strong>
          <div className="company">{data.company}</div>
        </div>
      ),
    },

    { headerName: "City", field: "city",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.city} {data.city}</strong>
          <div className="city">{data.city}</div>
        </div>
      ),
    },

    { headerName: "State", field: "state" ,
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.state} {data.state}</strong>
          <div className="state">{data.state}</div>
        </div>
      ),
    },

    { headerName: "Source", field: "source",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.state} {data.state}</strong>
          <div className="state">{data.state}</div>
        </div>
      ),
     },
    { headerName: "Status", field: "status",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.state} {data.state}</strong>
          <div className="state">{data.state}</div>
        </div>
      ),
    },
    { headerName: "Score", field: "score",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.score} {data.score}</strong>
          <div className="score">{data.score}</div>
        </div>
      ),
    },
    { headerName: "Lead Value", field: "lead_value",
       cellRenderer: ({ data }) => (
        <div>
          <strong>{data.lead_value} {data.lead_value}</strong>
          <div className="lead_value">{data.lead_value}</div>
        </div>
      ),
    },

    { headerName: "Last Acitivity AT", field: "city",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.city} {data.city}</strong>
          <div className="city">{data.city}</div>
        </div>
      ),
     },

    { headerName: "Is_Qualified", field: "is_qualified",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.is_qualified} {data.is_qualified}</strong>
          <div className="is_qualified">{data.is_qualified}</div>
        </div>
      ),
    },

    { headerName: "Created AT", field: "created_at" ,
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.created_at} {data.created_at}</strong>
          <div className="created_at">{data.created_at}</div>
        </div>
      ),
    },

    { headerName: "Updated AT", field: "updated_at",
      cellRenderer: ({ data }) => (
        <div>
          <strong>{data.updated_at} {data.updated_at}</strong>
          <div className="updated_at">{data.updated_at}</div>
        </div>
      ),
     },
    
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="filter-select">
          <option>All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Won</option>
          <option>Qualified</option>
          <option>Lost</option>
          <option>Other</option>
        </select>

        <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)} className="filter-select">
          <option>All Resources</option>
          <option>Website</option>
          <option>Facebook Ads</option>
          <option>Google Ads</option>
          <option>Referral</option>
          <option>Event</option>
          <option>Job Board</option>
          <option>Job Portal</option>
          <option>Other</option>
        </select>
      </div>
    </div>

      


      <AgGridReact rowData={filteredRowData.map((val)=>{
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
