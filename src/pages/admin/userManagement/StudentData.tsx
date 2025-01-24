/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    Flex,
    Modal,
    Pagination,
    Space,
    Table,
    TableColumnsType,
    TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam, TResponse, TStudent } from "../../../types";
import {
    useBlockStudentMutation,
    useGetAllStudentsQuery,
} from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "sonner";
import { TUser } from "../../../redux/features/auth/authSlice";

type TTableData = Pick<
    TStudent,
    "fullName" | "id" | "email" | "contactNo" | "user"
>;

const StudentData = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const [blockUser] = useBlockStudentMutation();
    const { confirm } = Modal;

    const showDeleteConfirm = (studentId: string) => {
        confirm({
            title: "Are you sure delete this task?",
            icon: <ExclamationCircleFilled />,
            content: "Some descriptions",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                console.log(studentId);
                try {
                    const toastId = toast.loading("Blocking user ");

                    const res = (await blockUser(
                        studentId
                    )) as TResponse<TUser>;

                    if (res.error) {
                        toast.error(res.error.data.message, { id: toastId });
                    } else {
                        toast.success("Blocked user", { id: toastId });
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                }
            },
        });
    };

    const {
        data: studentData,
        isLoading,
        isFetching,
    } = useGetAllStudentsQuery([
        { name: "limit", value: 10 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params,
    ]);

    const metaData = studentData?.meta;

    const tableData = studentData?.data?.map(
        ({ _id, id, fullName, email, contactNo }) => ({
            key: _id,
            id,
            fullName,
            email,
            contactNo,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "fullName",
        },
        {
            title: "Roll No.",
            dataIndex: "id",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Contact No",
            dataIndex: "contactNo",
        },
        {
            title: "Action",
            key: "x",
            render: (item) => {
                console.log(item);
                return (
                    <Space>
                        <Link to={`/admin/student-data/${item._id}`}>
                            <Button>Details</Button>
                        </Link>
                        <Link to={`/admin/student-data/update/${item._id}`}>
                            <Button>Update</Button>
                        </Link>
                        <Space wrap>
                            <Button
                                onClick={() => showDeleteConfirm(item.user)}
                                type="primary"
                                style={{ backgroundColor: "red" }}
                            >
                                Block
                            </Button>
                        </Space>
                    </Space>
                );
            },
            width: "1%",
        },
    ];

    const onChange: TableProps<TTableData>["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];

            filters.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            );
            filters.year?.forEach((item) =>
                queryParams.push({ name: "year", value: item })
            );

            setParams(queryParams);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                pagination={false}
            />
            <Flex justify="center" style={{ marginTop: "10px" }}>
                <Pagination
                    current={page}
                    onChange={(value) => setPage(value)}
                    pageSize={metaData?.limit}
                    total={metaData?.total}
                />
            </Flex>
        </>
    );
};

export default StudentData;
