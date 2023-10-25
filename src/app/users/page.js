import {PrismaClient} from "@prisma/client"
import {UsersTable} from "../components/users-table"
const prisma = new PrismaClient()
async function getUsers() {
	try {
		const data = await prisma.users.findMany({
			orderBy: {
				id: "desc",
			},
		})
		prisma.$disconnect()
		return data
	} catch (error) {
		console.error(error.message)
		// return NextResponse.json(
		// 	{
		// 		message: error.message,
		// 	},
		// 	{
		// 		status: 500,
		// 	},
		// )
	}
}
export default async function UsersPage() {
	const users = await getUsers()
	return (
		<div style={{minHeight: "100vh", padding: "8px"}}>
			<div>
				<UsersTable users={users} />
			</div>
		</div>
	)
}
