import React from 'react'
import { fetchEmailById } from '@/actions/useractions'

const ResultPage = async ({ params }) => {

    const emailId = params.id

    const email = await fetchEmailById(emailId)

    if (!email) {
        return (
            <div>Email not found</div>
        )
    }

    const content = JSON.parse(email.output)
    return (
        <>
            <div>
                <h1>Subject: {content.subject}</h1>
                <p>Body: {content.body}</p>
            </div>
        </>
    )
}

export default ResultPage