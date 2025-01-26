import { Form, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type TTimePickerProps = {
    name: string;
    label?: string;
    defaultValue?: string | Dayjs;
    disabled?: boolean;
};

const PHTimePicker = ({
    name,
    label,
    defaultValue,
    disabled,
}: TTimePickerProps) => {
    const { control } = useFormContext();

    return (
        <div style={{ marginBottom: "20px" }}>
            <Controller
                name={name}
                control={control}
                defaultValue={dayjs(defaultValue, "HH:mm")}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <Form.Item
                        label={label}
                        htmlFor={name}
                        style={{ fontWeight: "bold" }}
                    >
                        <TimePicker
                            disabled={disabled}
                            value={value || dayjs(defaultValue, "HH:mm")}
                            onChange={(time) => onChange(time as Dayjs)}
                            defaultValue={dayjs(defaultValue, "HH:mm")}
                            style={{ width: "100%", marginTop: "5px" }}
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

export default PHTimePicker;
