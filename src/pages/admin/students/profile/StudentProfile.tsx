import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TDataForSpecificStudent } from "@/schemas/AddStudentSchema.ts";
import { getSpecificStudent } from "@/services/studentsAndTeachers.ts";

const StudentProfile = () => {
  const {id} = useParams();

  const navigate = useNavigate();

  const [specificStudentData, setSpecificStudentData] = useState<TDataForSpecificStudent>()

  useEffect(() => {
    if (!id) return;
    getSpecificStudent({id}).then((data) => {
      setSpecificStudentData(data)
    })
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate(`/admin/students/profile/edit/${id}`, {state: specificStudentData})}>Edit</button>
    </div>
  )
}

export default StudentProfile;