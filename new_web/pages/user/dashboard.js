import React from "react";
import { useStore } from "/store/store";

export default function UserDashboard() {
  const { user, setUser } = useStore();

  return <div>Welcome {user.email}</div>;
}
