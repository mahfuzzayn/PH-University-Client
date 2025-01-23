import { Layout, Button } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
const { Header, Content, Footer } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Layout style={{ height: "100vh" }}>
            <Sidebar />
            <Layout>
                <Header style={{ padding: 0 }}>
                    <Button onClick={handleLogout}>Logout</Button>
                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <h1>The main content should go here</h1>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
