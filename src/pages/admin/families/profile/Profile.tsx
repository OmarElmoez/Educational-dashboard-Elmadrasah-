import { Heading } from "@/components/UI";
import { useNavigate, useParams } from "react-router-dom";
import EditPenIcon from "@/assets/edit_pen.svg?react";
import { useEffect, useState } from "react";
import { getSpecificFamily, TSpecificFamilyResponse } from "@/services/families.ts";
import { LoadingIndicator } from "@/components";

const FamilyProfile = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [specificFamilyData, setSpecificFamilyData] = useState<TSpecificFamilyResponse>()

  useEffect(() => {
    if (id) {
      getSpecificFamily(id).then(data => {
        setSpecificFamilyData(data);
      })
    }
  }, [id])

  return (
    <>
      {!specificFamilyData && <div className="loadingBox">
          <LoadingIndicator/>
      </div>}
    <div className="flex items-center gap-[2rem] mb-[4.8rem]">
      <Heading text={specificFamilyData?.full_name as string}
               style={{marginBottom: "0", color: "#000"}}/>
      <button onClick={() => navigate(`/admin/students/families-list/${id}/edit`, {state: specificFamilyData})}>
        <EditPenIcon/></button>
    </div>
    </>
  )
}

export default FamilyProfile