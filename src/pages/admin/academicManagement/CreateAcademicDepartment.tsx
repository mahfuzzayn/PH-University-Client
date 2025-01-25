/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import {
    useAddAcademicDepartmentMutation,
    useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

const CreateAcademicDepartment = () => {
    const { data: facultyData } = useGetAllFacultiesQuery(undefined);
    const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

    const defaultValues = {
        name: "Department of ",
    };

    const facultyOptions =
        facultyData?.data?.map((item) => ({
            value: item.name,
            label: item.name,
            academicFaculty: item._id,
        })) || [];

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");

        const academicFaculty =
            facultyOptions?.find(
                (item) => item.value === data.academicDepartment
            )?.academicFaculty || null;

        const departmentData = {
            name: data.name,
            academicFaculty,
        };

        try {
            const res = (await addAcademicDepartment(
                departmentData
            )) as TResponse<TAcademicDepartment>;

            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Department created", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span="8">
                <PHForm
                    onSubmit={onSubmit}
                    resolver={zodResolver(academicDepartmentSchema)}
                    defaultValues={defaultValues}
                >
                    <PHInput type="text" name="name" label="Name" />
                    <PHSelect
                        name="academicDepartment"
                        label="Academic Department"
                        options={facultyOptions}
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicDepartment;
