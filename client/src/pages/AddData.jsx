import { useMutation, useQueryClient } from "@tanstack/react-query";

const postUser = async (data) => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

const AddData = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
        console.log('Mutation successful, invalidating users query');
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const onSumit = (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const data = {
      displayName,
      photoURL,
      email,
    };
    mutation.mutate(data);
  };

  return (
    <div>
      <form onSubmit={onSumit}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            name="displayName"
            placeholder="displayName"
          />
          <label className="label">Photo URL</label>
          <input
            className="input"
            type="text"
            name="photoURL"
            placeholder="photoURL"
          />
          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="email"
          />
          <button className="btn btn-success" type="submit">
            Add
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddData;
