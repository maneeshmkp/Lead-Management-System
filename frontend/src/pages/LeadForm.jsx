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
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Lead" : "Create Lead"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="first_name"
          placeholder="First Name"
          value={lead.first_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={lead.last_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={lead.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={lead.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="company"
          placeholder="Company"
          value={lead.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="city"
          placeholder="City"
          value={lead.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="state"
          placeholder="State"
          value={lead.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select name="source" value={lead.source} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="website">Website</option>
          <option value="facebook_ads">Facebook Ads</option>
          <option value="google_ads">Google Ads</option>
          <option value="referral">Referral</option>
          <option value="events">Events</option>
          <option value="other">Other</option>
        </select>

        <select name="status" value={lead.status} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="new">New</option>
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
          className="w-full p-2 border rounded"
        />
        <input
          name="lead_value"
          type="number"
          placeholder="Lead Value"
          value={lead.lead_value}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            name="is_qualified"
            type="checkbox"
            checked={lead.is_qualified}
            onChange={handleChange}
          />
          <span>Qualified</span>
        </label>

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          {id ? "Update Lead" : "Create Lead"}
        </button>
      </form>
    </div>
  );
}
