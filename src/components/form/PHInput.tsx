import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
};

const PHInput = ({ type, name, label }: TInputProps) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item
                        label={label}
                        htmlFor={name}
                        style={{ fontWeight: "bold" }}
                    >
                        <Input
                            type={type}
                            {...field}
                            id={name}
                            style={{ marginTop: "5px" }}
                            size="large"
                        />

                        {error && (
                            <small
                                style={{ color: "red", fontWeight: "normal" }}
                            >
                                {error?.message}
                            </small>
                        )}
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PHInput;
