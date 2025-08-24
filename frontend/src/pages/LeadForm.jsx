import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function LeadForm() {
  const { id } = useParams(); 
  const [lead, setLead] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    is_qualified: false,
    priority: 0,
  });
  const navigate = useNavigate();

  // Fetch existing lead for edit
  useEffect(() => {
    if (id) {
      axios.get(`/leads/${id}`).then((res) => setLead(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/leads/${id}`, lead);
      } else {
        await axios.post("/leads", lead);
      }
      navigate("/leads");
    } catch (err) {
      console.error(err);
      alert("Error saving lead");
    }
  };

  return (
    <div className="card-container">
      <h2 className="card-title">{id ? "Edit Lead" : "Create Lead"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="first_name"
          placeholder="First Name"
          value={lead.first_name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={lead.last_name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={lead.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={lead.phone}
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="company"
          placeholder="Company"
          value={lead.company}
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="city"
          placeholder="City"
          value={lead.city}
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="state"
          placeholder="State"
          value={lead.state}
          onChange={handleChange}
          className="form-input"
        />

        <select name="source" value={lead.source} onChange={handleChange} className="leadForm-card">
          <option value="website">Website</option>
          <option value="facebook_ads">Facebook Ads</option>
          <option value="google_ads">Google Ads</option>
          <option value="referral">Referral</option>
          <option value="events">Events</option>
          <option value="other">Job Board</option>
          <option value="other">Job Prtal</option>
          <option value="other">Other</option>
        </select>

        <select name="status" value={lead.status} onChange={handleChange} className="leadForm-card">
          <option value="new">New</option>
          <option value="new">Fresher</option>
          <option value="new">Experience</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
          <option value="won">Won</option>
        </select>

        <input
          name="score"
          type="number"
          placeholder="Score"
          value={lead.score}
          onChange={handleChange}
          className="form-input"
        />
        <input
          name="lead_value"
          type="number"
          placeholder="Lead Value"
          value={lead.lead_value}
          onChange={handleChange}
          className="form-input"
        />
        <label className="check_is_qualified">
         <span className="check_box">Qualified</span>
          <input
            name="is_qualified"
            type="checkbox"
            checked={lead.is_qualified}
            onChange={handleChange}
            
          />
         
        </label>

        <button type="submit" className="submit-btn">
          {id ? "Update Lead" : "Create Lead"}
        </button>
      </form>
    </div>
  );
}
