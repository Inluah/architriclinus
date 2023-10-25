"use client"
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Button,
	useDisclosure,
	Input,
} from "@nextui-org/react"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@nextui-org/react"
import {useEffect, useState} from "react"
import DelteButton from "@/app/components/delete-button"
import {useRouter} from "next/navigation"

// import {createTodo} from "@/app/actions"
const initialState = {
	message: null,
}
function SubmitButton(props) {
	// const {pending} = useFormStatus()

	return (
		<button type="submit" aria-disabled={props.pending}>
			Add
		</button>
	)
}

export function UsersTable(props) {
	const [pending, setPending] = useState(false)
	const [id, setId] = useState(null)
	const [name, setName] = useState("")
	const [phone, setPhone] = useState("")
	const router = useRouter()
	const {isOpen, onOpen, onOpenChange} = useDisclosure()

	async function createUser(close) {
		setPending(true)
		try {
			const url = "/api/users"
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
					name,
					phone,
				}),
			}

			await fetch(url, options)
				.then((response) => response.json())
				.then((user) => {
					// The new user was created successfully.
				})
				.catch((error) => {
					// Handle the error.
				})
			router.refresh()
			setId(null)
			setName("")
			setPhone("")
			close()
			setPending(false)
		} catch (error) {
			// return response({
			// 	message: error.message,
			// })
			console.error(error.message)
		}
	}
	return (
		<>
			<div className="flex justify-end p-3">
				<Button className="" onPress={onOpen}>
					Add user
				</Button>
			</div>
			<Table className="dark" aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>NAME</TableColumn>
					<TableColumn>PHONE</TableColumn>
					<TableColumn
						style={{minWidth: "0.01%"}}
						className="flex justify-end"
					></TableColumn>
				</TableHeader>

				<TableBody className="">
					{props?.users?.map((user) => {
						return (
							<TableRow key={user?.id}>
								<TableCell>{user?.name}</TableCell>
								<TableCell>{user?.phone}</TableCell>
								<TableCell style={{width: "0.01%"}}>
									<div className="flex flex-nowrap gap-x-2">
										<Button
											onPress={() => {
												setId(user.id)
												setName(user.name)
												setPhone(user.phone)
												onOpen()
											}}
										>
											Edit
										</Button>
										{/* <Button color="danger">Delete</Button> */}
										<DelteButton id={user.id} />
									</div>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Add new user
							</ModalHeader>
							<ModalBody>
								{/* <form
								// onSubmit={createUser}
								> */}
								<Input
									value={name}
									label="Name"
									autoFocus
									onKeyUp={(ev) => {
										if (ev.key == "Enter") createUser(onClose)
									}}
									onChange={(data) => setName(data.target.value)}
								/>
								<Input
									value={phone}
									label="Phone"
									className="mt-3"
									onKeyUp={(ev) => {
										if (ev.key == "Enter") createUser(onClose)
									}}
									type="number"
									onChange={(data) => setPhone(data.target.value)}
									maxLength={10}
									minLength={10}
								/>

								{/* <label htmlFor="todo">Enter Task</label>
								<input type="text" id="todo" name="todo" required /> */}
								{/* <SubmitButton pending={pending} /> */}
								<p aria-live="polite" className="sr-only">
									{/* {state?.message} */}
								</p>
								{/* </form> */}
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button
									color="primary"
									type="submit"
									onKeyUp={(ev) => console.log(ev.Button)}
									onPress={async () => {
										await createUser(onClose)
									}}
									isLoading={pending}
								>
									Submit
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

// createTodo()
