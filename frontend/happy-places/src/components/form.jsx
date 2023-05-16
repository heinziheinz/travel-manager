import InputField from "./input-field";
import SubmitButton from "./submit-component";
const Form = ({ handleSubmit, inputFields, onChangeHandler }) => {
    return (
        <form onSubmit={handleSubmit}>
            {
                inputFields.map((fields, index) => {
                    return (
                        <InputField
                            key={index}
                            name={fields.name}
                            className={fields.className}
                            label={fields.label}
                            type={fields.type}
                            placeholder={fields.placeholder}
                            onChangeHandler={onChangeHandler}
                            value={fields.value}
                        />
                    );
                })
            }
            <SubmitButton value={"Submit"} />
        </form>
    );
}
export default Form;