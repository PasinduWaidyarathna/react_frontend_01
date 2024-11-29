import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import { Box } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get("http://localhost:3002/api/users")
      .then((response) => {
        setUsers(response?.data?.response || []);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  const addUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    };

    Axios.post("http://localhost:3002/api/createuser", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setIsEdit(false); // Corrected
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  const updateUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
    };

    Axios.post("http://localhost:3002/api/updateuser", payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setIsEdit(false); // Corrected
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };

  const deleteUser = (data) => {

    Axios.post("http://localhost:3002/api/deleteuser", { id: data.id })
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  };
  

  return (
    <Box
      sx={{
        width: "calc(100% - 100px)",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        submitted={submitted}
        data={selectedUser}
        isEdit={isEdit}
      />
      <UsersTable
        rows={users}
        selectedUser={(data) => {
          setSelectedUser(data);
          setIsEdit(true);
        }}
        deletedUser={data => window.confirm("Are you sure you want to delete this user?") && deleteUser(data)}
      />
    </Box>
  );
};

export default Users;