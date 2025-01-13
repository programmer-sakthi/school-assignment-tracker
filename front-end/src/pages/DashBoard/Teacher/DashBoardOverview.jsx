import { useEffect, useRef } from "react";
import Typed from "typed.js";

const DashboardOverview = () => {
    const typer = useRef(null);
    useEffect(() => {
      const typed = new Typed(typer.current, {
        strings: ["Welcome to the TeacherDashboard !"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: false,
      });
  
      return () => {
        typed.destroy(); 
      };
    }, []);
  
    return (
      <div className="dashboard-overview">
        <h3 className=".text-success">
          <span ref={typer} className=".text-success"></span>
        </h3>
        <div className="stats">
          <div className="stat-card">Total Institutions: 5</div>
          <div className="stat-card">Total Classes: 12</div>
          <div className="stat-card">Total Sections: 30</div>
          <div className="stat-card">Assignments Posted: 50</div>
        </div>
      </div>
    );
  };
  

  export default DashboardOverview;