import { useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../../redux/features/admin/userManagement.api";
import { Avatar, Descriptions, Divider, Flex } from "antd";

type TApiError = {
    data: {
        message: string;
    };
    status: number;
};

const FacultyDetails = () => {
    const { facultyId } = useParams();
    const { data, isLoading, isError, error } =
        useGetSingleFacultyQuery(facultyId);

    const fData = data?.data;

    console.log(fData);

    const facultyPersonalInfo = fData
        ? {
              Name: fData.fullName,
              Gender: fData.gender,
              "Date Of Birth": fData.dateOfBirth
                  ? new Date(fData.dateOfBirth).toISOString().split("T")[0]
                  : null,
              "Blood Group": fData.bloodGroup,
              Email: fData.email,
          }
        : null;

    const facultyContactInfo = fData
        ? {
              Contact: fData.contactNo,
              "Emergency Contact": fData.emergencyContact,
              "Present Address": fData.presentAddress,
              "Permanent Address": fData.presentAddress,
          }
        : null;

    const facultyAcademicInfo = fData
        ? {
              "Academic Department": fData.academicDepartment.name,
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
            {fData?.profileImg && (
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
                        src={fData?.profileImg}
                        alt={`${fData?.fullName} Profile`}
                    />
                </Flex>
            )}
            <h1 style={{ marginTop: "10px", textAlign: "center" }}>
                Faculty Details of {fData?.fullName}
            </h1>
            <Divider>Personal Info</Divider>
            <Descriptions size="middle">
                {facultyPersonalInfo &&
                    Object.entries(facultyPersonalInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <Divider style={{ marginTop: "50px" }}>Contact Info</Divider>
            <Descriptions size="middle">
                {facultyContactInfo &&
                    Object.entries(facultyContactInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <Divider style={{ marginTop: "50px" }}>Academic Info</Divider>
            <Descriptions size="middle">
                {facultyAcademicInfo &&
                    Object.entries(facultyAcademicInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
        </div>
    );
};

export default FacultyDetails;
