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
import { TAdmin, TQueryParam, TResponse } from "../../../../types";
import {
    useBlockAdminMutation,
    useGetAllAdminsQuery,
} from "../../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "sonner";

type TTableData = Pick<TAdmin, "fullName" | "id" | "email" | "contactNo">;

const AdminData = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [page, setPage] = useState(1);
    const [blockUser] = useBlockAdminMutation();
    const { confirm } = Modal;

    const showDeleteConfirm = (adminId: string) => {
        confirm({
            title: "Are you sure block this admin?",
            icon: <ExclamationCircleFilled />,
            content: "This cannot be undone",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                try {
                    const toastId = toast.loading("Blocking admin");

                    const res = (await blockUser(adminId)) as TResponse<TAdmin>;

                    if (res.error) {
                        toast.error(res.error.data.message, { id: toastId });
                    } else {
                        toast.success("Blocked admin", { id: toastId });
                    }
                } catch (error) {
                    toast.error("Something went wrong");
                }
            },
        });
    };

    const {
        data: adminData,
        isLoading,
        isFetching,
    } = useGetAllAdminsQuery([
        { name: "limit", value: 10 },
        { name: "page", value: page },
        { name: "sort", value: "id" },
        ...params,
    ]);

    const metaData = adminData?.meta;

    const tableData = adminData?.data?.map(
        ({ _id, id, user, fullName, email, contactNo }) => ({
            key: _id,
            user: user._id,
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
                return (
                    <Space>
                        <Link to={`/admin/admin-data/${item.key}`}>
                            <Button>Details</Button>
                        </Link>
                        <Link to={`/admin/admin-data/update/${item.key}`}>
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

export default AdminData;
