import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authServices";
import type { SignupData } from "../types/auth";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    role: "guest",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signupUser(form);
      alert(data.message);
      navigate("/login");
    } catch (error:any) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="guest">guest</option>
        <option value="owner">Owner</option>
      </select>

      <button type="submit">Signup</button>

      <p onClick={() => navigate("/login")}>
        Already have an account? Login
      </p>
    </form>
  );
};

export default Signup;