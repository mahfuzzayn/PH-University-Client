import { DatePicker, Form } from "antd";
import moment, { Moment } from "moment";
import { Controller, useFormContext } from "react-hook-form";

type TDatePickerProps = {
    name: string;
    label?: string;
    defaultValue?: string | Moment;
};

const PHDatePicker = ({ name, label, defaultValue }: TDatePickerProps) => {
    const { control } = useFormContext();

    return (
        <div style={{ marginBottom: "20px" }}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue ? moment(defaultValue) : undefined}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <Form.Item
                        label={label}
                        htmlFor={name}
                        style={{ fontWeight: "bold" }}
                    >
                        <DatePicker
                            value={value}
                            onChange={(date) => onChange(date)}
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

export default PHDatePicker;
