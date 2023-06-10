import { useQuery } from "@tanstack/react-query";
import SingleItem from "./SingleItem";
import customFetch from "./utils";
import { useFetchTasks } from "./reactQueryAndCustomHooks";

const Items = () => {
  const { isLoading, isError, data, error } = useFetchTasks();

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>;
  }

  // if (isError) {
  //   return <p style={{ marginTop: "1rem" }}>There was an error...</p>;
  // }

  if (error) {
    return <p style={{ marginTop: "1rem" }}>{error.response.data}</p>;
  }

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
