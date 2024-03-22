import React, { useEffect } from "react";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice";
import { GetAllAdmins, UpdateAdminStatus } from "../../apicalls/admins";
import { message, Table } from "antd";
import PageTitle from "../../components/PageTitle";
import { useDispatch } from "react-redux";

const Admins = () => {

const [users, setUsers] = React.useState([]);

const dispatch = useDispatch();


 const getData = async () => {
        try{
          dispatch(ShowLoading());
          const response = await GetAllAdmins();
          dispatch(HideLoading());
          if(response.success){
            setUsers(response.data);
          }else{
            message.error(response.message);
          }
        }catch(error){
           dispatch(HideLoading());
           message.error(error.message);
        }
    }

const updateAdminStatus = async (record, isAdmin) => {
   try{
    dispatch(ShowLoading());
     const response = await UpdateAdminStatus({
        selectedAdmin : record._id,
        isAdmin,
     });
     dispatch(HideLoading());
     if(response.success){
        message.success(response.message);
        getData();
     } else{
       message.error(response.message);
     }

   }catch(error){
       dispatch(HideLoading());
       message.error(error.message);
   }
}

 const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
        title: "Admin",
        dataIndex: "isAdmin",
        render: (text, record) => {
            return text ? "Yes" : "No"
        },
    },
    {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => {
          return (
            <div className="flex gap-1">
              {record.isAdmin? 
              (
                <button className="primary-outlined-btn"
                 onClick ={() => updateAdminStatus(record, false)}
                >Remove Admin</button>
              ) : (
                <button className="primary-outlined-btn"
                 onClick = {() => updateAdminStatus(record, true)} 
                >Make Admin</button>
              )}
            </div>
          );
        },
      },
  ];


  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Admins"></PageTitle>
      <Table dataSource ={users} columns={columns} className="mt-2"></Table>
    </div>
  );
};

export default Admins;
