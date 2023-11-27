import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import TasksTable from "../components/TasksTable";
import { useDispatch, useSelector } from "react-redux";


export default function HomePage() {




  
  return (
    <>
      <NavBar />
      <TasksTable />
    </>
  );
}
