/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
    useGetAllDepartmentsQuery,
    useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse, TStudent } from "../../../types";

const CreateStudent = () => {
    const [addStudent] = useAddStudentMutation();
    const { data: sData, isLoading: sIsLoading } =
        useGetAllSemestersQuery(undefined);
    const { data: dData, isLoading: dIsLoading } = useGetAllDepartmentsQuery(
        undefined,
        { skip: sIsLoading }
    );

    const semesterOptions = sData?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`,
    }));

    const departmentOptions = dData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }));

    // This is only for development purposes
    // Should be removed
    const studentDefaultValues = {
        name: {
            firstName: "Jonab",
            middleName: "Sumon",
            lastName: "Ahmed",
        },
        gender: "Male",
        bloodGroup: "O+",
        email: "sumonahmedmokon@gmail.com",
        contactNo: "12345",
        emergencyContactNo: "0987654321",
        presentAddress: "123 Main Street, Cityville",
        permanentAddress: "456 Elm Street, Townsville",
        guardian: {
            fatherName: "Richard Doe",
            fatherOccupation: "Engineer",
            fatherContactNo: "1122334455",
            motherName: "Jane Doe",
            motherOccupation: "Teacher",
            motherContactNo: "2233445566",
        },
        localGuardian: {
            name: "Peter Parker",
            occupation: "Businessman",
            address: "789 Willow Lane, Suburbia",
            contactNo: "3344556677",
        },
        admissionSemester: "677785372b8b366148062286",
        academicDepartment: "6777812637612322b1aa4f6f",
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");
        const formData = new FormData();

        const studentData = {
            student: data,
        };

        try {
            formData.append("data", JSON.stringify(studentData));

            if (data.image) {
                formData.append("file", data.image);
            }

            const res = (await addStudent(formData)) as TResponse<TStudent>;
            console.log(res);

            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Student created", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }

        // This is for development
        // Just for checking
        // console.log(Object.fromEntries(formData));
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
                                    <Form.Item label="Picture">
                                        <Input
                                            type="file"
                                            {...field}
                                            value={value?.fileName}
                                            onChange={(e) =>
                                                onChange(e.target.files?.[0])
                                            }
                                        />
                                    </Form.Item>
                                )}
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
                        <Divider style={{ fontSize: "20px" }}>
                            Guardian Info
                        </Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.fatherName"
                                    label="Father Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.fatherOccupation"
                                    label="Father Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.fatherContactNo"
                                    label="Father ContactNo"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.motherName"
                                    label="Mother Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.motherOccupation"
                                    label="Mother Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="guardian.motherContactNo"
                                    label="Mother ContactNo"
                                />
                            </Col>
                        </Row>
                        <Divider style={{ fontSize: "20px" }}>
                            Local Guardian Info
                        </Divider>
                        <Row gutter={8}>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.name"
                                    label="Name"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.occupation"
                                    label="Occupation"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.contactNo"
                                    label="Contact No"
                                />
                            </Col>
                            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                                <PHInput
                                    type="text"
                                    name="localGuardian.address"
                                    label="Address"
                                />
                            </Col>
                        </Row>
                    </Row>
                    <Divider style={{ fontSize: "20px" }}>
                        Academic Info
                    </Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect
                                name="admissionSemester"
                                label="Admission Semester"
                                options={semesterOptions}
                                disabled={sIsLoading}
                            />
                        </Col>
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
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    );
};

export default CreateStudent;
