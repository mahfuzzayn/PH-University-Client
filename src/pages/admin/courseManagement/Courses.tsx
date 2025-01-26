import { Button, Modal, Table, TableColumnsType } from "antd";
import {
    useAddFacultiesMutation,
    useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

const Courses = () => {
    const {
        data: courses,
        isLoading,
        isFetching,
    } = useGetAllCoursesQuery(undefined);

    const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
        key: _id,
        title,
        code: `${prefix}${code}`,
    }));

    const columns: TableColumnsType = [
        {
            title: "Title",
            key: "title",
            dataIndex: "title",
        },
        {
            title: "Code",
            key: "code",
            dataIndex: "code",
        },
        {
            title: "Action",
            key: "x",
            render: (item) => {
                return <AddFacultyModal facultyInfo={item} />;
            },
        },
    ];

    // const onChange: TableProps<TTableData>["onChange"] = (
    //     pagination,
    //     filters,
    //     sorter,
    //     extra
    // ) => {
    //     if (extra.action === "filter") {
    //         const queryParams: TQueryParam[] = [];

    //         setParams(queryParams);
    //     }
    // };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
            // onChange={onChange}
        />
    );
};

const AddFacultyModal = ({ facultyInfo }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
    const [addFaculties] = useAddFacultiesMutation();

    const facultiesOptions = facultiesData?.data?.map((item) => ({
        value: item._id,
        label: item.fullName,
    }));

    const handleSubmit = (data: any) => {
        const facultyData = {
            courseId: facultyInfo.key,
            data,
        };

        addFaculties(facultyData);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal}>Add Faculty</Button>
            <Modal
                title="Assign Faculties"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <PHForm onSubmit={handleSubmit}>
                    <PHSelect
                        mode="multiple"
                        options={facultiesOptions}
                        name="faculties"
                        label="Faculties"
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    );
};

export default Courses;
