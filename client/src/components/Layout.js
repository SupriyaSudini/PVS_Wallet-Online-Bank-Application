import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import SuperAdminMenuDisplay from './superAdminMenu';

function Layout({children}) {
  const [collapsed, setCollapsed] = React.useState(false);
  const {user} = useSelector((state) => state.users);
  const navigate = useNavigate();
  const userMenu = [
    {
      title : "Home",
      icon: <i class="ri-home-7-line"></i>,
      onClick : () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <i class="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions"
    },
    {
      title: "Requests",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests"
    },
    {
      title: "Profile",
      icon:<i class="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path:"/profile"
    },
    {
      title: "Logout",
      icon:<i class="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout"
    }

  ]

  const adminMenu = [
    {
      title : "Home",
      icon: <i class="ri-home-7-line"></i>,
      onClick : () => navigate("/"),
      path: "/",
    },
    {
      title : "Users",
      icon: <i class="ri-user-settings-line"></i>,
      onClick : () => navigate("/users"),
      path: "/users",
    },

    {
      title: "Transactions",
      icon: <i class="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions"
    },
    {
      title: "Requests",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests"
    },
    {
      title: "Profile",
      icon:<i class="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path:"/profile"
    },
    {
      title: "Logout",
      icon:<i class="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout"
    }
  ]


  const superMenu = [
    {
      title : "Home",
      icon: <i class="ri-home-7-line"></i>,
      onClick : () => navigate("/"),
      path: "/",
    },
    {
      title : "Users",
      icon: <i class="ri-user-settings-line"></i>,
      onClick : () => navigate("/users"),
      path: "/users",
    },
    {
      title : "Admins",
      icon: <i class="ri-user-2-fill"></i>,
      onClick : () => navigate("/admins"),
      path: "/admins",
    },

    // {
    //   title: "Transactions",
    //   icon: <i class="ri-bank-line"></i>,
    //   onClick: () => navigate("/transactions"),
    //   path: "/transactions"
    // },
    // {
    //   title: "Requests",
    //   icon: <i class="ri-hand-heart-line"></i>,
    //   onClick: () => navigate("/requests"),
    //   path: "/requests"
    // },
    {
      title: "Profile",
      icon:<i class="ri-user-3-line"></i>,
      onClick: () => navigate("/profile"),
      path:"/profile"
    },
    {
      title: "Logout",
      icon:<i class="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/logout"
    }
  ]


  // const menuToRender = user?.isAdmin ? adminMenu : userMenu ;
  const menuToRender = user?.isAdmin ? adminMenu : (user?.role ==="superadmin" ? superMenu : userMenu);

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        const screenHeight = window.innerHeight;
        sidebar.style.height = screenHeight + 'px';
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='layout'>
      <div className='sidebar'>
        <div className='menu'>
          {menuToRender.map((item) => {
            const isActive = window.location.pathname ===item.path;
            return(
              <div className ={`menu-item ${isActive ? "active-menu-item" : ""}`}
              onClick ={item.onClick}
              >
                    {item.icon}
                    {!collapsed && (<h1 className= "text-sm">{item.title}</h1>)}
              </div>
            );
          })}

        </div>
      </div>
      <div className='body'>
          <div className='header flex justify-between items-center'>
             <div className='text-secondary'>
                {!collapsed && 
                 <i class="ri-close-line" 
                    onClick ={() => setCollapsed(!collapsed) }></i> }
                {collapsed && 
                 <i class="ri-menu-2-line" 
                    onClick = {() => setCollapsed(!collapsed)}
                 ></i>}
             </div>
             <div>
               <h1 className='text-xl text-secondary'>PVS_WALLET</h1>
             </div>
             <div>
                <h1 className='text-sm text-secondary underline'>
              
                 {/* {user?.isAdmin ? "ADMIN" : "USER"}  : {user?.firstName} {user?.lastName} */}
                 {/* {user?.isAdmin ? "ADMIN" : (user?.role ==="superadmin" ? "SUPER-ADMIN" : "USER")} */}
                 {user?.isAdmin ? "ADMIN" : user?.role === "superadmin" ? "SUPER-ADMIN" : "USER"} : {user?.firstName} {user?.lastName}

              
                </h1>
             </div>
          </div>
          <div className='content'>{children}</div>  
      </div>     

    </div>
  )
}

export default Layout;
