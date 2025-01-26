import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import {
    useGetAllOfferedCoursesQuery,
    useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TSemester } from "../../../types";
import { useState } from "react";
import moment from "moment";

type TTableData = Pick<TSemester, "status" | "startDate" | "endDate">;

const items = [
    {
        label: "Upcoming",
        key: "UPCOMING",
    },
    {
        label: "Ongoing",
        key: "ONGOING",
    },
    {
        label: "Ended",
        key: "ENDED",
    },
];

const OfferedCourses = () => {
    const [semesterId, setSemesterId] = useState();
    const {
        data: offeredCoursesData,
        isLoading,
        isFetching,
    } = useGetAllOfferedCoursesQuery(undefined);

    const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

    const tableData = offeredCoursesData?.data?.map(
        ({ _id, academicSemester, startDate, endDate, status }) => ({
            key: _id,
            name: `${academicSemester.name} ${academicSemester.year}`,
            startDate: moment(startDate).format("Do MMMM, YYYY"),
            endDate: moment(endDate).format("Do MMMM, YYYY"),
            status,
        })
    );

    const handleStatusUpdate = (data: { key: string }) => {
        // console.log("semesterId", semesterId);
        // console.log("newStatus", data.key);

        const updatedData = {
            id: semesterId,
            data: {
                status: data.key,
            },
        };

        updateSemesterStatus(updatedData);
    };

    const menuProps = {
        items,
        onClick: handleStatusUpdate,
    };

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (item) => {
                let color;

                if (item === "UPCOMING") {
                    color = "blue";
                } else if (item === "ONGOING") {
                    color = "green";
                } else if (item === "ENDED") {
                    color = "red";
                }

                return <Tag color={color}>{item}</Tag>;
            },
        },
        {
            title: "Start Date",
            key: "startDate",
            dataIndex: "startDate",
        },
        {
            title: "End Date",
            key: "endDate",
            dataIndex: "endDate",
        },
        {
            title: "Action",
            key: "x",
            render: (item) => {
                return (
                    <Dropdown menu={menuProps} trigger={["click"]}>
                        <Button onClick={() => setSemesterId(item?.key)}>
                            Update
                        </Button>
                    </Dropdown>
                );
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

export default OfferedCourses;
