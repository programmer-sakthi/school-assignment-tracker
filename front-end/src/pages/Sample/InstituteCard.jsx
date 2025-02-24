import { useColorMode } from "@chakra-ui/react";
import {
  Building,
  GraduationCap,
  MoreHorizontal,
  PenSquare,
  School,
  Trash2,
  Users,
} from "lucide-react";

const InstituteCard = ({
  instituteID,
  name,
  location,
  studentCount,
  teacherCount,
  imageUrl,
  onDelete,
  onUpdate,
}) => {
  const { colorMode } = useColorMode();
  studentCount = 60;
  teacherCount = 5;
  location = "Coimbatore";

  return (
    <div
      className={`relative group rounded-xl p-6 transition-all duration-300 hover:shadow-lg animate-fade-in backdrop-blur-sm border ${
        colorMode === "light"
          ? "bg-white border-gray-200"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      <div
        className={`absolute -z-10 inset-0 bg-gradient-to-br ${
          colorMode === "light"
            ? "from-primary/5 to-secondary/5"
            : "from-primary/10 to-secondary/10"
        } rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Action Icons */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
        <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
          <PenSquare className="w-4 h-4 text-blue-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden"
          style={{ width: "5rem", height: "5rem" }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <School className="w-6 h-6 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold mb-2 ${
              colorMode === "light" ? "text-gray-900" : "text-white"
            }`}
          >
            {name}
          </h3>
          <div
            className={`flex items-center text-sm mb-3 ${
              colorMode === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <Building className="w-4 h-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center text-sm ${
                colorMode === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              <GraduationCap className="w-4 h-4 mr-1 text-primary/70" />
              <span>{studentCount} Students</span>
            </div>
            <div
              className={`flex items-center text-sm ${
                colorMode === "light" ? "text-gray-600" : "text-gray-300"
              }`}
            >
              <Users className="w-4 h-4 mr-1 text-primary/70" />
              <span>{teacherCount} Teachers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteCard;
