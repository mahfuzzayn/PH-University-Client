/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultValues = {
        userId: "2026030001",
        password: "ami123",
    };

    const [login] = useLoginMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading("Logging in");
        try {
            const userInfo = {
                id: data.userId,
                password: data.password,
            };

            const res = await login(userInfo).unwrap();

            const user = verifyToken(res.data.accessToken) as TUser;

            dispatch(setUser({ user, token: res.data.accessToken }));
            toast.success("Logged in", { id: toastId, duration: 2000 });

            if (res.data.needsPasswordChange) {
                navigate("/change-password");
            } else {
                navigate(`/${user.role}/dashboard`);
            }
        } catch (error: any) {
            toast.error("Something went wrong", {
                id: toastId,
                duration: 2000,
            });
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type="text" name="userId" label="User ID" />
                <PHInput type="text" name="password" label="Password" />
                <Button htmlType="submit">Login</Button>
            </PHForm>
        </Row>
    );
}
