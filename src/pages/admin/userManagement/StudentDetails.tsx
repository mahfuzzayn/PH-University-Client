import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Avatar, Descriptions, Divider, Flex } from "antd";

type TApiError = {
    data: {
        message: string;
    };
    status: number;
};

const StudentDetails = () => {
    const { studentId } = useParams();
    const { data, isLoading, isError, error } =
        useGetSingleStudentQuery(studentId);

    const sData = data?.data;

    const studentPersonalInfo = sData
        ? {
              Name: sData.fullName,
              Gender: sData.gender,
              "Date Of Birth": sData.dateOfBirth
                  ? new Date(sData.dateOfBirth).toISOString().split("T")[0]
                  : null,
              "Blood Group": sData.bloodGroup,
              Email: sData.email,
          }
        : null;

    const studentContactInfo = sData
        ? {
              Contact: sData.contactNo,
              "Emergency Contact": sData.emergencyContact,
              "Present Address": sData.presentAddress,
              "Permanent Address": sData.presentAddress,
          }
        : null;

    const studentGuardianInfo = sData
        ? {
              "Father Name": sData.guardian.fatherName,
              "Father Occupation": sData.guardian.fatherOccupation,
              "Father ContactNo": sData.guardian.fatherContactNo,
              "Mother Name": sData.guardian.motherName,
              "Mother Occupation": sData.guardian.motherOccupation,
              "Mother ContactNo": sData.guardian.motherContactNo,
          }
        : null;

    const studentLocalGuardianInfo = sData
        ? {
              Name: sData.localGuardian.name,
              Occupation: sData.localGuardian.occupation,
              "Contact No": sData.localGuardian.contactNo,
              Address: sData.localGuardian.address,
          }
        : null;

    const studentAcademicInfo = sData
        ? {
              "Academic Semester": sData.admissionSemester.name,
              "Academic Department": sData.academicDepartment.name,
          }
        : null;

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {(error as TApiError).data.message}</p>;
    }

    return (
        <div>
            {sData?.profileImg && (
                <Flex justify="center">
                    <Avatar
                        size={{
                            xs: 80,
                            sm: 90,
                            md: 100,
                            lg: 150,
                            xl: 160,
                            xxl: 170,
                        }}
                        src={sData?.profileImg}
                        alt={`${sData?.fullName} Profile`}
                    />
                </Flex>
            )}
            <h1 style={{ marginTop: "10px", textAlign: "center" }}>
                Student Details of {sData?.fullName}
            </h1>
            <Divider>Personal Info</Divider>
            <Descriptions size="middle">
                {studentPersonalInfo &&
                    Object.entries(studentPersonalInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <Divider style={{ marginTop: "50px" }}>Contact Info</Divider>
            <Descriptions size="middle">
                {studentContactInfo &&
                    Object.entries(studentContactInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <Divider style={{ marginTop: "50px" }}>Guardian Info</Divider>
            <Descriptions size="middle">
                {studentGuardianInfo &&
                    Object.entries(studentGuardianInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <Divider style={{ marginTop: "50px" }}>Local Guardian Info</Divider>
            <Descriptions size="middle">
                {studentLocalGuardianInfo &&
                    Object.entries(studentLocalGuardianInfo).map(
                        ([item, value]) => (
                            <Descriptions.Item label={item} key={item}>
                                {value}
                            </Descriptions.Item>
                        )
                    )}
            </Descriptions>
            <Divider style={{ marginTop: "50px" }}>Academic Info</Divider>
            <Descriptions size="middle">
                {studentAcademicInfo &&
                    Object.entries(studentAcademicInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
        </div>
    );
};

export default StudentDetails;
