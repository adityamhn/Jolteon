import React from "react";
import { useStore } from "/store/store";
import Button from "/components/Button";
import { logout } from "../../services/auth.service";

export default function UserDashboard() {
  const { user } = useStore();

  return (
    <div>
      Welcome {user?.email}
      <Button
        onClick={() => {
          logout()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        logout man
      </Button>
    </div>
  );
}
