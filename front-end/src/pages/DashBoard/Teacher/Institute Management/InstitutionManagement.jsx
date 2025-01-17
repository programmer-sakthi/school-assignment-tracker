import AddInstitutionModal from "./AddInstitutionModal";
import InstitutionCard from "./InstitutionCard";
const InstitutionManagement = () => {
    const instituteData = [
      {
        imageURL: "https://skcet.ac.in/wp-content/uploads/2023/12/Library-page-image.jpg",
        instituteName: "SKCET",
        classCount: 10,
        teacherCount: 60,
        studentCount: 700,
      },
      {
        imageURL: "https://skct.edu.in/wp-content/uploads/2024/04/SKCT-College-Campus-7.jpg",
        instituteName: "SKCT",
        classCount: 8,
        teacherCount: 50,
        studentCount: 500,
      }
    ];
  
    return (
      <div>
        <h3>Manage Institutions</h3>
        <AddInstitutionModal />
        <h3>Institutions</h3>
        <div className="d-flex flex-wrap justify-content-around" >
          {instituteData.map((institute) => {
            return <InstitutionCard institute={institute} />;
          })}
        </div>
      </div>
    );
  };

  export default InstitutionManagement;