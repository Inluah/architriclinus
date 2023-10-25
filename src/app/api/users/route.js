import {NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"
import {error} from "console"

const prisma = new PrismaClient()

export async function GET(request, response) {
	try {
		const users = await prisma.users.findMany()
		prisma.$disconnect()
		return NextResponse.json({
			data: users,
		})
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: 500,
			},
		)
	}
}

export async function POST(request, response) {
	try {
		const {id, name, phone} = await request.json()
		if (!name || !phone) {
			throw {
				message: "asdf",
				status: 400,
			}
		}
		if (id) {
			const users = await prisma.users.update({
				where: {
					id,
				},
				data: {
					name,
					phone,
				},
			})
		} else {
			const users = await prisma.users.create({
				data: {
					name,
					phone,
				},
			})
		}
		prisma.$disconnect()
		return NextResponse.json({name, phone})
	} catch (error) {
		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: 500,
			},
		)
	}
}

export async function DELETE(request, response) {
	try {
		const id = await request.json()

		await prisma.users.delete({
			where: {
				id,
			},
		})
		return NextResponse.json({
			message: id,
		})
	} catch (error) {
		console.error(error.message)

		return NextResponse.json(
			{
				message: error.message,
			},
			{
				status: 500,
			},
		)
	}
}
