import React, { useEffect } from "react";
import { useStore } from "/store/store";
import { getAllSellers } from "../../services/auth.service";

export default function UserDashboard() {
  const { user, setUser } = useStore();
  useEffect(() => {
    getAllSellers();
  }, []);
  return <div>Welcome {user.email}</div>;
}
