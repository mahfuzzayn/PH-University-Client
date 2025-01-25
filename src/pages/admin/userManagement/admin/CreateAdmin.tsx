/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import { useGetAllAcademicDepartmentsQuery } from "../../../../redux/features/admin/academicManagement.api";
import { useAddAdminMutation } from "../../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TAdmin, TResponse } from "../../../../types";

const CreateAdmin = () => {
    const [addAdmin] = useAddAdminMutation();
    const { data: dData, isLoading: dIsLoading } =
        useGetAllAcademicDepartmentsQuery(undefined);

    const departmentOptions = dData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    // This is only for development purposes
    // Should be removed
    const studentDefaultValues = {
        name: {
            firstName: "Dr",
            middleName: "Kazi",
            lastName: "Yunus",
        },
        designation: "Senior Professor",
        gender: "Male",
        email: "dryunus@gmail.com",
        contactNo: "01606451099",
        emergencyContactNo: "0987654321",
        bloodGroup: "B+",
        presentAddress: "123 Main Street, Cityville",
        permanentAddress: "456 Elm Street, Townsville",
        managementDepartment: "6777812637612322b1aa4f6f",
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");
        const formData = new FormData();

        const adminData = {
            admin: data,
        };

        try {
            formData.append("data", JSON.stringify(adminData));

            if (data.image) {
                formData.append("file", data.image);
            }

            const res = (await addAdmin(formData)) as TResponse<TAdmin>;

            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Admin created", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Row>
            <Col span={24}>
                <PHForm
                    onSubmit={onSubmit}
                    defaultValues={studentDefaultValues}
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
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Controller
                                name="image"
                                render={({
                                    field: { onChange, value, ...field },
                                }) => (
                                    <Form.Item
                                        label="Picture"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        <Input
                                            type="file"
                                            {...field}
                                            value={value?.fileName}
                                            onChange={(e) =>
                                                onChange(e.target.files?.[0])
                                            }
                                            size="large"
                                            style={{ marginTop: "5px" }}
                                        />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="designation"
                                label="Designation"
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
                        Management Info
                    </Divider>
                    <Row gutter={8}>
                        <Col
                            span={24}
                            md={{ span: 12 }}
                            lg={{ flex: "0 0 60%" }}
                        >
                            <PHSelect
                                name="managementDepartment"
                                label="Management Department"
                                options={departmentOptions}
                                disabled={dIsLoading}
                            />
                        </Col>
                    </Row>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateAdmin;
