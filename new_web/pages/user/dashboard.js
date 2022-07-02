import React, { useEffect } from "react";
import { useStore } from "/store/store";
import { getAllSellers } from "../../services/auth.service";
import Button from "/components/Button";
import { logout } from "../../services/auth.service";

export default function UserDashboard() {
  const { user } = useStore();
  useEffect(() => {
    getAllSellers();
  }, []);

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
