import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";

type TTableData = {
    name: string;
    academicFaculty: string;
};

const AcademicDepartment = () => {
    const {
        data: departmentData,
        isLoading,
        isFetching,
    } = useGetAllAcademicDepartmentsQuery(undefined);

    const tableData = departmentData?.data?.map(
        ({ _id, name, academicFaculty }) => ({
            key: _id,
            name,
            academicFaculty: academicFaculty.name,
        })
    );

    const columns: TableColumnsType<TTableData> = [
        {
            title: "Name",
            dataIndex: "name",
            defaultSortOrder: "ascend",
        },
        {
            title: "Academic Faculty",
            dataIndex: "academicFaculty",
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

export default AcademicDepartment;
