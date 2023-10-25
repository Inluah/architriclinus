"use client"

import {Button} from "@nextui-org/react"
import {experimental_useFormStatus as useFormStatus} from "react-dom"

export function SubmitButton(data) {
	return (
		<>
			<Button className="w-full" type="submit">
				{data.label}
			</Button>
		</>
	)
}
