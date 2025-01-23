import { Input } from "antd";
import FormItemLabel from "antd/es/form/FormItemLabel";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
};

const PHInput = ({ type, name, label }: TInputProps) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            {label ? (
                <label
                    htmlFor={name}
                    style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    {label}
                </label>
            ) : null}
            <Controller
                name={name}
                render={({ field }) => (
                    <Input
                        type={type}
                        {...field}
                        id={name}
                        style={{ marginTop: "5px" }}
                    />
                )}
            />
        </div>
    );
};

export default PHInput;
