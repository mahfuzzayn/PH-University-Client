import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
    label: string;
    name: string;
    options: { value: string; label: string; disabled?: boolean }[] | undefined;
    disabled?: boolean;
    mode?: "multiple" | undefined;
    onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

const PHSelectWithWatch = ({
    label,
    name,
    options,
    disabled,
    mode,
    onValueChange,
}: TPHSelectProps) => {
    const { control } = useFormContext();
    const inputValue = useWatch({
        control,
        name,
    });

    useEffect(() => {
        onValueChange(inputValue);
    }, [inputValue, onValueChange]);

    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label} style={{ fontWeight: "bold" }}>
                    <Select
                        mode={mode}
                        style={{ width: "100%", marginTop: "5px" }}
                        {...field}
                        options={options}
                        size="large"
                        disabled={disabled}
                    />
                    {error && (
                        <small style={{ color: "red" }}>{error?.message}</small>
                    )}
                </Form.Item>
            )}
        />
    );
};

export default PHSelectWithWatch;
