/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global.type";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
    const [addRegisterSemester] = useAddRegisteredSemesterMutation();
    const { data: academicSemesters } = useGetAllAcademicSemestersQuery([
        {
            name: "sort",
            value: "year",
        },
    ]);

    const academicSemestersOptions = academicSemesters?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");

        const semesterData = {
            ...data,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit),
        };

        try {
            const res = (await addRegisterSemester(
                semesterData
            )) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Semester registered", { id: toastId });
            }
        } catch (err: any) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span="8">
                <PHForm onSubmit={onSubmit}>
                    <PHSelect
                        name="academicSemester"
                        label="Academic Semester"
                        options={academicSemestersOptions}
                    />
                    <PHSelect
                        name="status"
                        label="Status"
                        options={semesterStatusOptions}
                    />
                    <PHDatePicker name="startDate" label="Start Date" />
                    <PHDatePicker name="endDate" label="End Date" />
                    <PHInput type="text" name="minCredit" label="Min Credit" />
                    <PHInput type="text" name="maxCredit" label="Max Credit" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default SemesterRegistration;
