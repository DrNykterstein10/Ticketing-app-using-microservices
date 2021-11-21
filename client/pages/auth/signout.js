import Router from "next/router";
import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";

const signOut = () => {
  const { makeRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    makeRequest();
  }, []);

  return <div>Signing you out...</div>;
};

export default signOut;
