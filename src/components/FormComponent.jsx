import React, { useState } from "react";

const FormComponent = ({ onSubmit = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    tallyVersion: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.tallyVersion) {
      alert("Please fill all required fields");
      return;
    }
    setSubmitted(true);
    if (onSubmit) {
      onSubmit(formData);
    }
    setTimeout(() => {
      window.location.href = "https://tallyconnects.com";
    }, 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: "0 auto",
        padding: "0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Form Header */}
      <div style={{ marginBottom: window.innerWidth < 768 ? "16px" : "20px", textAlign: "center" }}>
        <h2 style={{
          fontSize: window.innerWidth < 768 ? "18px" : "22px",
          fontWeight: "700",
          color: "#1f2937",
          margin: "0 0 6px 0",
          fontFamily: "'Outfit', sans-serif",
        }}>
          Get Free Demo Access
        </h2>
        <p style={{
          fontSize: "13px",
          color: "#6b7280",
          margin: 0,
        }}>
          Fill in your details to get started
        </p>
      </div>

      {/* Name Field */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "14px", width: "100%" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}
        >
          <span style={{ color: "#ef4444" }}>*</span> Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "13px",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
            background: "#ffffff",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
          required
        />
      </div>

      {/* Phone Field */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "14px", width: "100%" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}
        >
          <span style={{ color: "#ef4444" }}>*</span> Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "13px",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
            background: "#ffffff",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
          required
        />
      </div>

      {/* Email Field */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "14px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}
        >
          <span style={{ color: "#ef4444" }}>*</span> Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your.email@example.com"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "13px",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
            background: "#ffffff",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
          required
        />
      </div>

      {/* TallyPrime Version Field */}
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "16px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}
        >
          <span style={{ color: "#ef4444" }}>*</span> Which TallyPrime version is in use?
        </label>
        <input
          type="text"
          name="tallyVersion"
          value={formData.tallyVersion}
          onChange={handleInputChange}
          placeholder="e.g., Version 5.3"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "13px",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
            background: "#ffffff",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 8px 20px rgba(20, 184, 166, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 12px rgba(20, 184, 166, 0.25)";
        }}
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)",
          color: "#ffffff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "700",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 12px rgba(20, 184, 166, 0.25)",
          letterSpacing: "0.3px",
          marginTop: "4px",
        }}
      >
        Get Free Demo Access Today!
      </button>

      {submitted && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px 12px",
            background: "#d1fae5",
            color: "#047857",
            borderRadius: "6px",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          ✓ Form submitted successfully! Redirecting...
        </div>
      )}
    </form>
  );
};

export default FormComponent;
