"use client"

import {useEffect, useState} from "react"
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@nextui-org/react"
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()
async function getUsers() {
	return await prisma.users.findMany()
}
export default function IndexPage() {
	const {users, setUsers} = useState()
	useEffect(() => {
		async function fetchUser() {
			const res = await getUsers()
			setUsers(res)
		}
	})
	return (
		<main style={{minHeight: "100vh"}}>
			<Table className="dark" aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>NAME</TableColumn>
					<TableColumn>ROLE</TableColumn>
					<TableColumn>STATUS</TableColumn>
				</TableHeader>
				<TableBody>
					{/* <TableRow key="2">
						<TableCell>Zoey Lang</TableCell>
						<TableCell>Technical Lead</TableCell>
						<TableCell>Paused</TableCell>
					</TableRow>
					<TableRow key="3">
						<TableCell>Jane Fisher</TableCell>
						<TableCell>Senior Developer</TableCell>
						<TableCell>Active</TableCell>
					</TableRow>
					<TableRow key="4">
						<TableCell>William Howard</TableCell>
						<TableCell>Community Manager</TableCell>
						<TableCell>Vacation</TableCell>
					</TableRow> */}
				</TableBody>
			</Table>
		</main>
	)
}
