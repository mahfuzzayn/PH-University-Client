/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import {
    useAddCourseMutation,
    useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
    const [addCourse] = useAddCourseMutation();
    const { data: courses } = useGetAllCoursesQuery(undefined);

    const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
        value: item._id,
        label: item.title,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating...");

        const courseData = {
            ...data,
            code: Number(data.code),
            credits: Number(data.credits),
            isDeleted: false,
            preRequisiteCourses: data.preRequisiteCourses
                ? data.preRequisiteCourses.map((item: any) => ({
                      course: item,
                      isDeleted: false,
                  }))
                : [],
        };

        try {
            const res = (await addCourse(courseData)) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success("Course created", { id: toastId });
            }
        } catch (err: any) {
            toast.error("Something went wrong", { id: toastId });
        }
    };

    return (
        <Flex justify="center" align="center">
            <Col span="8">
                <PHForm onSubmit={onSubmit}>
                    <PHInput type="text" name="title" label="Title" />
                    <PHInput type="text" name="prefix" label="Prefix" />
                    <PHInput type="text" name="code" label="Code" />
                    <PHInput type="text" name="credits" label="Credits" />
                    <PHSelect
                        mode="multiple"
                        options={preRequisiteCoursesOptions}
                        name="preRequisiteCourses"
                        label="PreRequisiteCourses"
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateCourse;
