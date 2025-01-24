import { Table, TableColumnsType, TableProps } from "antd";
import { TAcademicFaculty } from "../../../types/academicManagement.type";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
    const {
        data: facultyData,
        isLoading,
        isFetching,
    } = useGetAllFacultiesQuery(undefined);

    const tableData = facultyData?.data?.map(({ _id, name }) => ({
        key: _id,
        name,
    }));

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
            defaultSortOrder: "descend",
        },
    ];

    const onChange: TableProps<TTableData>["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        console.log(pagination, filters, sorter, extra);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
        />
    );
};

export default AcademicFaculty;
