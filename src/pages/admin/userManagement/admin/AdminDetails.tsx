import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../../redux/features/admin/userManagement.api";
import { Avatar, Descriptions, Divider, Flex } from "antd";

type TApiError = {
    data: {
        message: string;
    };
    status: number;
};

const AdminDetails = () => {
    const { adminId } = useParams();
    const { data, isLoading, isError, error } = useGetSingleAdminQuery(adminId);

    const aData = data?.data;

    const adminPersonalInfo = aData
        ? {
              Name: aData.fullName,
              Gender: aData.gender,
              "Date Of Birth": aData.dateOfBirth
                  ? new Date(aData.dateOfBirth).toISOString().split("T")[0]
                  : null,
              "Blood Group": aData.bloodGroup,
              Email: aData.email,
          }
        : null;

    const adminContactInfo = aData
        ? {
              Contact: aData.contactNo,
              "Emergency Contact": aData.emergencyContact,
              "Present Address": aData.presentAddress,
              "Permanent Address": aData.presentAddress,
          }
        : null;

    const adminManagementInfo = aData
        ? {
              "Management Department": aData.managementDepartment.name,
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
            {aData?.profileImg && (
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
                        src={aData?.profileImg}
                        alt={`${aData?.fullName} Profile`}
                    />
                </Flex>
            )}
            <h1 style={{ marginTop: "10px", textAlign: "center" }}>
                Admin Details of {aData?.fullName}
            </h1>
            <Divider>Personal Info</Divider>
            <Descriptions size="middle">
                {adminPersonalInfo &&
                    Object.entries(adminPersonalInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <Divider style={{ marginTop: "50px" }}>Contact Info</Divider>
            <Descriptions size="middle">
                {adminContactInfo &&
                    Object.entries(adminContactInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
            <Divider style={{ marginTop: "50px" }}>Management Info</Divider>
            <Descriptions size="middle">
                {adminManagementInfo &&
                    Object.entries(adminManagementInfo).map(([item, value]) => (
                        <Descriptions.Item label={item} key={item}>
                            {value}
                        </Descriptions.Item>
                    ))}
            </Descriptions>
        </div>
    );
};

export default AdminDetails;
