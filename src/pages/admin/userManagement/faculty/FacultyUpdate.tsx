/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { useGetAllAcademicDepartmentsQuery } from "../../../../redux/features/admin/academicManagement.api";
import {
    useGetSingleFacultyQuery,
    useUpdateFacultyMutation,
} from "../../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TFaculty, TResponse } from "../../../../types";
import { useParams } from "react-router-dom";
import moment from "moment";

const FacultyUpdate = () => {
    const { facultyId } = useParams();
    const [updateFaculty] = useUpdateFacultyMutation();
    const { data: facultyData } = useGetSingleFacultyQuery(facultyId);
    const { data: dData, isLoading: dIsLoading } =
        useGetAllAcademicDepartmentsQuery(undefined);

    const departmentOptions = dData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    // This is only for development purposes
    // Should be removed
    const facultyDefaultValues = facultyData
        ? {
              ...facultyData?.data,
              dateOfBirth: facultyData?.data?.dateOfBirth
                  ? moment(facultyData?.data?.dateOfBirth)
                  : null,
              academicDepartment: departmentOptions?.find(
                  (item) =>
                      item.value === facultyData?.data?.academicDepartment?._id
              )?.value,
          }
        : {};

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Updating...");

        const updatedData = {
            faculty: data,
        };

        try {
            const res = (await updateFaculty({
                facultyId,
                data: updatedData,
            })) as TResponse<TFaculty>;

            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Faculty updated", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    if (dIsLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Row>
            <Col span={24}>
                <PHForm
                    onSubmit={onSubmit}
                    defaultValues={facultyDefaultValues}
                >
                    <Divider style={{ fontSize: "20px" }}>
                        Personal Info
                    </Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="name.firstName"
                                label="First Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="name.middleName"
                                label="Middle Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="name.lastName"
                                label="Last Name"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect
                                name="gender"
                                label="Gender"
                                options={genderOptions}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHDatePicker
                                name="dateOfBirth"
                                label="Date of Birth"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect
                                name="bloodGroup"
                                label="Blood Group"
                                options={bloodGroupOptions}
                            />
                        </Col>
                        <Divider style={{ fontSize: "20px" }}>
                            Contact Info
                        </Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="email"
                                    label="Email"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="contactNo"
                                    label="Contact"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="emergencyContactNo"
                                    label="Emergency Contact"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="presentAddress"
                                    label="Present Address"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="permanentAddress"
                                    label="Permanent Address"
                                />
                            </Col>
                        </Row>
                    </Row>
                    <Divider style={{ fontSize: "20px" }}>
                        Academic Info
                    </Divider>
                    <Row gutter={8}>
                        <Col
                            span={24}
                            md={{ span: 12 }}
                            lg={{ flex: "0 0 60%" }}
                        >
                            <PHSelect
                                name="academicDepartment"
                                label="Academic Department"
                                options={departmentOptions}
                                disabled={dIsLoading}
                            />
                        </Col>
                    </Row>
                    <Button htmlType="submit" type="primary">
                        Update
                    </Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default FacultyUpdate;
