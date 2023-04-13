import Form from "@/modules/Form";
import { get } from "lodash";

const Home = () => {
	return (
		<div className="container mx-auto">
			<Form url={"/posts/10"} fields={[{ name: "username", required: true }]}>
				{({ register, handleSubmit, formState }) => {
					const { errors } = formState;
					console.log(errors);
					return (
						<>
							<div>
								<div className="flex flex-col">
									<label htmlFor="username">Username</label>
									<input
										className="outline-none border-slate-400 border"
										id="username"
										type="text"
										{...register("username", {
											required: "Username is required",
											minLength: 3,
											maxLength: 20
										})}
									/>
									<small>{get(errors, "username.type") === "required" && get(errors, "username.message")}</small>
								</div>
								<div className="flex flex-col">
									<label htmlFor="name">Name</label>
									<input
										className="outline-none border-slate-400 border"
										id="name"
										type="text"
										{...register("name", {
											required: "Name is required",
											minLength: 3,
											maxLength: 20
										})}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="password">Password</label>
									<input
										className="outline-none border-slate-400 border"
										id="password"
										type="password"
										{...register("password", {
											required: "Password must be at least 3 characters",
											minLength: 3,
											maxLength: 20
										})}
									/>
								</div>
								<button className="block mx-auto outline-0 bg-blue-500" onClick={handleSubmit}>
									Submit
								</button>
							</div>
						</>
					);
				}}
			</Form>
		</div>
	);
};

export default Home;
