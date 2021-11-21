import Form from "../../components/Form";

const signinForm = () => {
  return (
    <Form heading="Sign In" url="/api/users/signin" buttonText="Sign In" />
  );
};

export default signinForm;
