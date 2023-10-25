"use client"
import React, {useState} from "react"
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react"
import {PrismaClient} from "@prisma/client"
import {useRouter} from "next/navigation"

const prisma = new PrismaClient()
export default function ConfirmDeleteDialog(props) {
	const {isOpen, onOpen, onOpenChange} = useDisclosure()
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const onConfirmDelete = async (close) => {
		try {
			setLoading(true)
			// const url = `/api/users/${props.id}`
			const url = `/api/users`
			const options = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: props.id,
			}
			await fetch(url, options)
			router.refresh()
			close()
			setLoading(false)
		} catch (error) {
			setLoading(false)
			console.error(error.message)
		}
	}
	return (
		<>
			<Button color="danger" onPress={onOpen}>
				Delete
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader>CONFIRM DELETE</ModalHeader>
							<ModalBody>
								Are you sure you want to delete{" "}
								{props?.name ?? "the selected item"}?
							</ModalBody>

							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Cancel
								</Button>
								<Button
									color="danger"
									isLoading={loading}
									onClick={() => {
										onConfirmDelete(onClose)
									}}
								>
									Confirm
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}
